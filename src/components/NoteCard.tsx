import type { Note } from "../types/note";

type NoteCardProps = {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onPin: (id: string) => void;
  onArchive: (id: string) => void;
};

function NoteCard({
  note,
  onEdit,
  onDelete,
  onPin,
  onArchive,
}: NoteCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex justify-between gap-3">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          {note.title}
        </h3>

        {note.isPinned && <span>📌</span>}
      </div>

      <p className="my-4 whitespace-pre-wrap break-words text-slate-600 dark:text-slate-300">
        {note.content}
      </p>

      <p className="mb-4 text-xs text-slate-400">
        Updated: {new Date(note.updatedAt).toLocaleDateString()}
      </p>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => onPin(note.id)}
          className="rounded-lg bg-amber-100 px-3 py-2 text-sm text-amber-800">
          {note.isPinned ? "Unpin" : "Pin"}
        </button>

        <button onClick={() => onEdit(note)}
          className="rounded-lg bg-blue-100 px-3 py-2 text-sm text-blue-800">
          Edit
        </button>

        <button onClick={() => onArchive(note.id)}
          className="rounded-lg bg-purple-100 px-3 py-2 text-sm text-purple-800">
          {note.isArchived ? "Restore" : "Archive"}
        </button>

        <button onClick={() => onDelete(note.id)}
          className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-800">
          Delete
        </button>
      </div>
    </article>
  );
}

export default NoteCard;