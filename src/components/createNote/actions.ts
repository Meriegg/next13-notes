"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createNote = async (data: {
  content: string,
  title: string,
  isPublic: boolean
}) => {
  const newNote = await prisma.note.create({
    data: {
      ...data
    }
  })

  revalidatePath("/")
}