import { create } from "zustand";

export const useModalStore = create((set) => ({
  isModalOpen: false,
  isNewNoteModalOpen: false,
  isEditNoteModalOpen: false,

  openModal: (modal) =>
    set((state) => {
      return { [modal]: true };
    }),
  closeModal: (modal) =>
    set((state) => {
      return { [modal]: false };
    }),
}));
