import { create } from "zustand";

export const useModalStore = create((set) => ({
  isModalOpen: false,

  openModal: () =>
    set(() => {
      return { isModalOpen: true };
    }),
  closeModal: () =>
    set(() => {
      return { isModalOpen: false };
    }),
}));
