import useLocalStorage from "./useLocalStorage";
import type { Note } from "../types/note";

export function useNotes() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);

  // Add a new note
  const addNote = (title: string, content: string) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: false,
      isArchived: false,
    };

    setNotes((currentNotes) => [newNote, ...currentNotes]);
  };

  // Edit an existing note
  const updateNote = (
    id: string,
    title: string,
    content: string
  ) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              title,
              content,
              updatedAt: new Date().toISOString(),
            }
          : note
      )
    );
  };

  // Delete a note
  const deleteNote = (id: string) => {
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== id)
    );
  };

  // Pin or unpin a note
  const togglePin = (id: string) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id
          ? { ...note, isPinned: !note.isPinned }
          : note
      )
    );
  };

  // Archive or restore a note
  const toggleArchive = (id: string) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id
          ? { ...note, isArchived: !note.isArchived }
          : note
      )
    );
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
    toggleArchive,
  };
}