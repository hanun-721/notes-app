import { useId, useState } from "react";
import type { Note } from "../../types/note";

type NoteEditorProps = {
  note: Note | null;
  onSave: (title: string, content: string) => void;
  onCancel: () => void;
};

function NoteEditor({
  note,
  onSave,
  onCancel,
}: NoteEditorProps) {
  const titleId = useId();
  const contentId = useId();

  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() && !content.trim()) {
      return;
    }

    onSave(title.trim(), content.trim());

    setTitle("");
    setContent("");
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h2 className="mb-5 text-xl font-bold text-slate-800 dark:text-white">
        {note ? "Edit Note" : "Create a Note"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor={titleId}
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Note Title
          </label>

          <input
            id={titleId}
            type="text"
            placeholder="Enter your note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor={contentId}
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Note Content
          </label>

          <textarea
            id={contentId}
            rows={7}
            placeholder="Write your thoughts here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full resize-none rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
          >
            {note ? "Update Note" : "Save Note"}
          </button>

          {note && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-slate-300 px-4 py-3 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-white dark:hover:bg-slate-700"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default NoteEditor;