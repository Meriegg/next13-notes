"use client";

import { InputGroup } from "../ui/inputGroup";
import { createNote } from "./actions";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik } from "formik";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTransition } from "react";

const CreateNote = () => {
  const [isPending, startTransition] = useTransition();

  const validationSchema = z.object({
    content: z.string(),
  });

  const { values, errors, handleChange, handleSubmit } = useFormik<
    z.infer<typeof validationSchema>
  >({
    validationSchema: toFormikValidationSchema(validationSchema),
    initialValues: {
      content: "",
    },
    onSubmit: (data, { resetForm }) => {
      startTransition(() => createNote(data.content));
      resetForm();
    },
  });

  return (
    <div className="m-auto mt-4" style={{ width: "min(450px, 100%)" }}>
      <form onSubmit={handleSubmit}>
        <InputGroup
          onChange={handleChange("content")}
          value={values.content}
          error={errors.content}
          placeholder="Note content"
          label="Note content"
        />
        <Button isLoading={isPending} className="mt-2 w-full" type="submit">
          Add Note
        </Button>
      </form>
    </div>
  );
};

export default CreateNote;
