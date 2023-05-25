"use client";

import { useState, useTransition } from "react";
import { type Note } from "@prisma/client";
import { Button } from "../ui/button";
import { deleteNote, updateNote } from "./actions";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik } from "formik";
import { CheckboxGroup } from "../ui/checkboxGroup";
import { InputGroup } from "../ui/inputGroup";

interface Props {
  note: Note;
}

export const NoteDisplay = ({ note }: Props) => {
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [isEditPending, startEditTransition] = useTransition();
  const [isEditing, setEditing] = useState(false);

  const validationSchema = z.object({
    content: z.string(),
    title: z.string(),
    isPublic: z.boolean(),
  });

  const { values, errors, handleChange, handleSubmit, setFieldValue, resetForm } = useFormik<
    z.infer<typeof validationSchema>
  >({
    validationSchema: toFormikValidationSchema(validationSchema),
    initialValues: {
      content: note.content,
      title: note.title || "",
      isPublic: note.isPublic,
    },
    onSubmit: (data, { resetForm }) => {
      startEditTransition(() => updateNote(note.id, data));
      resetForm();
      setEditing(false);
    },
  });

  return (
    <div className="px-4 py-2 rounded-md bg-neutral-100">
      {!isEditing && (
        <>
          <p className="text-lg font-bold">{note.title || "Untitled"}</p>
          <p className="font-semibold text-neutral-900 text-sm mt-2">{note.content}</p>
        </>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <InputGroup
            onChange={handleChange("title")}
            value={values.title}
            error={errors.title}
            placeholder="Note title"
            label="Note title"
          />
          <InputGroup
            onChange={handleChange("content")}
            value={values.content}
            error={errors.content}
            placeholder="Note content"
            label="Note content"
          />
          <CheckboxGroup
            label="Make this note public?"
            onCheckedChange={(value) => setFieldValue("isPublic", value)}
            checked={values.isPublic}
          />
          <Button className="w-full" type="submit" isLoading={isEditPending}>
            Save changes
          </Button>
        </form>
      )}

      <div className="flex items-center mt-2 gap-2 w-full">
        {!isEditing && (
          <>
            <Button
              isLoading={isDeletePending}
              onClick={() => {
                if (!confirm("Are you sure you want to delete this note?")) return;
                startDeleteTransition(() => deleteNote(note.id));
              }}
              className="w-full"
              variant="destructive"
              size="sm"
            >
              Delete
            </Button>

            <Button
              className="w-full"
              isLoading={isDeletePending}
              onClick={() => setEditing(true)}
              size="sm"
            >
              Edit
            </Button>
          </>
        )}
        {isEditing && (
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => {
              resetForm();
              setEditing(false);
            }}
          >
            Discard changes
          </Button>
        )}
      </div>
    </div>
  );
};
