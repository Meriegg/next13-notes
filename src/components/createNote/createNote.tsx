"use client";

import { InputGroup } from "../ui/inputGroup";
import { createNote } from "./actions";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik } from "formik";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { CheckboxGroup } from "../ui/checkboxGroup";

const CreateNote = () => {
  const [isPending, startTransition] = useTransition();

  const validationSchema = z.object({
    content: z.string(),
    title: z.string(),
    isPublic: z.boolean(),
  });

  const { values, errors, handleChange, handleSubmit, setFieldValue } = useFormik<
    z.infer<typeof validationSchema>
  >({
    validationSchema: toFormikValidationSchema(validationSchema),
    initialValues: {
      content: "",
      title: "",
      isPublic: false,
    },
    onSubmit: (data, { resetForm }) => {
      startTransition(() => createNote(data));
      resetForm();
    },
  });

  return (
    <div className="m-auto mt-4" style={{ width: "min(450px, 100%)" }}>
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
        <Button isLoading={isPending} type="submit">
          Add Note
        </Button>
      </form>
    </div>
  );
};

export default CreateNote;
