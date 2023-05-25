import CreateNote from "@/components/createNote/createNote";
import { prisma } from "@/lib/prisma";

const getNotes = async () => {
  const notes = await prisma.note.findMany();

  return notes;
};

const Home = async () => {
  const notes = await getNotes();

  return (
    <main>
      <CreateNote />
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </main>
  );
};

export default Home;
