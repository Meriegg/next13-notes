"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export const deleteNote = async (noteId: string) => {
  const deletedNote = await prisma.note.delete({
    where: {
      id: noteId
    }
  });

  revalidatePath("/")
}

export const updateNote = async (noteId: string, data: {
  title: string;
  content: string;
  isPublic: boolean;
}) => {
  const updatedNote = await prisma.note.update({
    where: {
      id: noteId
    },
    data: {
      ...data,
      updatedOn: new Date(Date.now())
    }
  });

  revalidatePath("/")
}