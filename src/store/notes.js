import { create } from "zustand";

// interface Note {
//   id: string;
//   title: string;
//   note: string;
//   dateCreated: string;
//   dateDeleted: string;
//   dateEdited: string;
//   pinned: boolean;
// }

// type NotesStore = {
//   notes: Note[] | [];
//   add: (note: Note) => void;
//   remove: (note: Note) => void;
//   removeAll: () => void;
//   getNotes: () => void;
// };
const LOCAL_STORAGE_NOTES = "notes";

// const NOTES: Note[] = [
//   {
//     id: "11",
//     title: "Note 1",
//     note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas rem quam asperiores, minus, dolor expedita odit molestias sequi, dolorem deleniti possimus sapiente aliquid eos veritatis tenetur! Necessitatibus praesentium sed itaque.",
//     dateCreated: "",
//     dateDeleted: "",
//     dateEdited: "",
//     pinned: false,
//   },
//   {
//     id: "22",
//     title: "Note 2",
//     note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas rem quam asperiores, minus, dolor expedita odit molestias sequi, dolorem deleniti possimus sapiente aliquid eos veritatis tenetur! Necessitatibus praesentium sed itaque.",
//     dateCreated: "",
//     dateDeleted: "",
//     dateEdited: "",
//     pinned: false,
//   },
//   {
//     id: "33",
//     title: "Note 3",
//     note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas rem quam asperiores, minus, dolor expedita odit molestias sequi, dolorem deleniti possimus sapiente aliquid eos veritatis tenetur! Necessitatibus praesentium sed itaque.",
//     dateCreated: "",
//     dateDeleted: "",
//     dateEdited: "",
//     pinned: false,
//   },
// ];

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key) ?? "[]");
}

function setLocalStorage(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}
function useLocalStorageAddNote(notes) {
  setLocalStorage(LOCAL_STORAGE_NOTES, []);
  setLocalStorage(LOCAL_STORAGE_NOTES, notes);
}
function useLocalStorageGetNotes() {
  const notesLocalStorage = getLocalStorage(LOCAL_STORAGE_NOTES);
  return notesLocalStorage;
}
function useLocalStorageRemoveNotes() {
  setLocalStorage(LOCAL_STORAGE_NOTES, []);
}

export const useNotesStore = create((set) => ({
  notes: [],

  add: (note) =>
    set((state) => {
      const notesClone = structuredClone([...state.notes, note]);
      useLocalStorageAddNote(notesClone);
      return { notes: notesClone };
    }),
  edit: (note) =>
    set((state) => {
      const index = state.notes.indexOf(note);
      const newArrayEditedNote = state.notes.toSpliced(index, 1, note);
      useLocalStorageAddNote(newArrayEditedNote);
      return { notes: newArrayEditedNote };
    }),
  remove: (note) =>
    set((state) => {
      const index = state.notes.indexOf(note);
      const newArrayNotes = state.notes.toSpliced(index, 1);
      useLocalStorageAddNote(newArrayNotes);
      return { notes: newArrayNotes };
    }),
  removeAll: () =>
    set(() => {
      useLocalStorageRemoveNotes();
      return { notes: [] };
    }),
  getNotes: () =>
    set(() => {
      const notes = useLocalStorageGetNotes();
      return { notes };
    }),
}));
