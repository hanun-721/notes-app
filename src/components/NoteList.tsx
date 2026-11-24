import type { Note } from "../types/note";
import NoteCard from "./NoteCard";

type NoteListProps = {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onPin: (id: string) => void;
  onArchive: (id: string) => void;
};

function NoteList({
  notes,
  onEdit,
  onDelete,
  onPin,
  onArchive,
}: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="rounded-xl bg-slate-100 p-10 text-center dark:bg-slate-800">
        <p className="text-slate-500 dark:text-slate-300">
          No notes available yet. Create your first note!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onPin={onPin}
          onArchive={onArchive}
        />
      ))}
    </div>
  );
}

export default NoteList;