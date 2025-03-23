import { create } from "zustand";

export const useModalStore = create((set) => ({
  isNewNoteModalOpen: false,
  isEditNoteModalOpen: false,
  isEditChecklistModalOpen: false,

  openModal: (modal) =>
    set((state) => {
      return { [modal]: true };
    }),
  closeModal: (modal) =>
    set((state) => {
      return { [modal]: false };
    }),
}));
