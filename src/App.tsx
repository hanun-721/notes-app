 import { useEffect, useState } from "react";
import "./App.css";
import { useTheme } from "./context/themecontext";

type Note = {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  archived: boolean;
  deleted: boolean;
  updatedAt: string;
};

type Filter = "all" | "pinned" | "archived" | "trash";

function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const saved = localStorage.getItem("my-notes");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    localStorage.setItem("my-notes", JSON.stringify(notes));
  }, [notes]);

  const clearForm = () => {
    setTitle("");
    setContent("");
    setEditingId(null);
  };

  const saveNote = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content.");
      return;
    }

    if (editingId) {
      setNotes((previous) =>
        previous.map((note) =>
          note.id === editingId
            ? {
                ...note,
                title: title.trim(),
                content: content.trim(),
                updatedAt: new Date().toLocaleString(),
              }
            : note
        )
      );
    } else {
      const newNote: Note = {
        id: crypto.randomUUID(),
        title: title.trim(),
        content: content.trim(),
        pinned: false,
        archived: false,
        deleted: false,
        updatedAt: new Date().toLocaleString(),
      };

      setNotes((previous) => [newNote, ...previous]);
    }

    clearForm();
  };

  const editNote = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteNote = (id: string) => {
    setNotes((previous) =>
      previous.map((note) =>
        note.id === id ? { ...note, deleted: true } : note
      )
    );
  };

  const restoreNote = (id: string) => {
    setNotes((previous) =>
      previous.map((note) =>
        note.id === id
          ? { ...note, deleted: false, archived: false }
          : note
      )
    );
  };

  const togglePin = (id: string) => {
    setNotes((previous) =>
      previous.map((note) =>
        note.id === id
          ? { ...note, pinned: !note.pinned }
          : note
      )
    );
  };

  const toggleArchive = (id: string) => {
    setNotes((previous) =>
      previous.map((note) =>
        note.id === id
          ? { ...note, archived: !note.archived }
          : note
      )
    );
  };

  const permanentlyDelete = (id: string) => {
    if (window.confirm("Permanently delete this note?")) {
      setNotes((previous) =>
        previous.filter((note) => note.id !== id)
      );
    }
  };

  const filteredNotes = notes
    .filter((note) => {
      if (filter === "all") {
        return !note.deleted && !note.archived;
      }

      if (filter === "pinned") {
        return note.pinned && !note.deleted && !note.archived;
      }

      if (filter === "archived") {
        return note.archived && !note.deleted;
      }

      if (filter === "trash") {
        return note.deleted;
      }

      return false;
    })
    .filter((note) =>
  `${note.title} ${note.content}`
    .toLowerCase()
    .includes(search.toLowerCase())
)
    .sort((a, b) => Number(b.pinned) - Number(a.pinned));

  const filters: Filter[] = [
    "all",
    "pinned",
    "archived",
    "trash",
  ];

  return (
    <main className="app-container">
      <header className="app-header">
        <div className="header-top">
          <div>
            <h1>My Notes 📝</h1>
            <p>Keep your ideas organized and safe.</p>
          </div>
 <button
            className="theme-button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </header>

      <section className="editor-card">
        <h2>
          {editingId ? "Edit Note ✏️" : "Create New Note ✨"}
        </h2>

        <label htmlFor="note-title">Note Title</label>

        <input
          id="note-title"
          type="text"
          placeholder="Enter note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="note-content">Note Content</label>

        <textarea
          id="note-content"
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
        />

        <div className="editor-actions">
          <button className="save-button" onClick={saveNote}>
            {editingId ? "Update Note" : "Add Note"}
          </button>

          {editingId && (
            <button className="cancel-button" onClick={clearForm}>
              Cancel
            </button>
          )}
        </div>
      </section>

      <section className="notes-section">
        <h2>My Note List 📚</h2>

        <input
          className="search-input"
          type="search"
          placeholder="🔍 Search your notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <nav className="filter-buttons">
          {filters.map((item) => (
            <button
              key={item}
              className={filter === item ? "active-filter" : ""}
              onClick={() => setFilter(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </nav>

        {filteredNotes.length === 0 ? (
          <div className="empty-state">
            <h3>No notes found 📭</h3>
            <p>Create a new note or try another filter.</p>
          </div>
        ) : (
          <div className="notes-grid">
            {filteredNotes.map((note) => (
              <article className="note-card" key={note.id}>
                <div className="note-heading">
                  <h3>{note.title}</h3>
                  {note.pinned && <span>📌</span>}
                </div>

                <p className="note-content">{note.content}</p>

                <small>Updated: {note.updatedAt}</small>

                <div className="note-actions">
                  {note.deleted ? (
                    <>
                      <button onClick={() => restoreNote(note.id)}>
                        Restore
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => permanentlyDelete(note.id)}
                      >
                        Delete Forever
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => togglePin(note.id)}>
                        {note.pinned ? "Unpin" : "Pin"}
                      </button>

                      {!note.archived && (
                        <button onClick={() => editNote(note)}>
                          Edit
                        </button>
                      )}

                      <button onClick={() => toggleArchive(note.id)}>
                        {note.archived ? "Unarchive" : "Archive"}
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => deleteNote(note.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
<footer className="app-footer">
        <p>© 2026 Hanan | My Notes App</p>
      </footer>
    </main>
  );
}

export default App;