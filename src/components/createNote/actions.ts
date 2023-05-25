"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createNote = async (content: string) => {
  const newNote = await prisma.note.create({
    data: {
      content
    }
  })

  revalidatePath("/")
}