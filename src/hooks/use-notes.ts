import { useState } from "react";
import { toast } from "sonner";
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
    toast.success("Your note has been deleted");
  };

  const addNoteFromStore = (note: Note) => {
    add(note);
    toast.success("Your note has been created");
  };

  const editNoteFromStore = (note: Note) => {
    edit(note);
    toast.success("Your note has been edited");
  };

  return {
    notes,
    isLoading,
    getNotesFromStore,
    handleAddNote: addNoteFromStore,
    handleEditNote: editNoteFromStore,
    removeNoteFromStore,
  } as const;
}
