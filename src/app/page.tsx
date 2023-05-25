import CreateNote from "@/components/createNote/createNote";
import { NoteDisplay } from "@/components/note/noteDisplay";
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
      <div className="flex flex-col gap-2 m-auto mt-4" style={{ width: "min(450px, 100%)" }}>
        {notes.map((note, idx) => (
          <NoteDisplay note={note} key={idx} />
        ))}
      </div>
    </main>
  );
};

export default Home;
