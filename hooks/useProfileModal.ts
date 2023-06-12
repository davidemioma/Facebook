import { create } from "zustand";

interface Props {
  isOpen: boolean;
  toggle: () => void;
  onClose: () => void;
}

const useProfileModal = create<Props>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  onClose: () => set({ isOpen: false }),
}));

export default useProfileModal;
