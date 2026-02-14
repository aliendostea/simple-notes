import { useState } from "react";
import { toast } from "sonner";
import { useNotesStore } from "@/store/notes";
import { ChecklistProps, Note } from "@/const";

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
        }, 100);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeNoteFromStore = (note: Note | ChecklistProps) => {
    remove(note);
    toast.success("Your note has been deleted");
  };

  const addNoteFromStore = (note: Note) => {
    add(note);
    toast.success("Your note has been created");
  };

  const addChecklistFromStore = (checklistNote: ChecklistProps) => {
    add(checklistNote);
    toast.success("Your checklist has been created");
  };

  const editNoteFromStore = (note: Note | ChecklistProps) => {
    edit(note);
    toast.success("Your note has been edited");
  };

  const editChecklistFromStore = (note: Note | ChecklistProps) => {
    edit(note);
  };

  return {
    notes,
    isLoading,
    getNotesFromStore,
    handleAddNote: addNoteFromStore,
    handleAddChecklist: addChecklistFromStore,
    handleEditNote: editNoteFromStore,
    handleEditChecklist: editChecklistFromStore,
    removeNoteFromStore,
  } as const;
}
