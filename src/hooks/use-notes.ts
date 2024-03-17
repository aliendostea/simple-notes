import { useState } from "react";
import { useNotesStore } from "@/store/notes";

interface Note {
  id: string;
  title: string;
  note: string;
  dateCreated: string;
  dateDeleted: string;
  dateEdited: string;
  pinned: boolean;
}

export default function useNotes() {
  const [isLoading, setIsLoading] = useState(true);
  const { notes, getNotes, add, edit, remove } = useNotesStore();

  const getNotesFromStore = async () => {
    setIsLoading(true);

    try {
      await new Promise(function (resolve) {
        setTimeout(() => {
          resolve("The sum of all data is 100.");
          getNotes();

          setIsLoading(false);
        }, 900);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeNoteFromStore = (note: Note) => {
    remove(note);
  };

  return {
    notes,
    isLoading,
    getNotesFromStore,
    handleAddNote: add,
    handleEditNote: edit,
    removeNoteFromStore,
  } as const;
}
