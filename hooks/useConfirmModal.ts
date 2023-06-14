import { create } from "zustand";

interface ModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useConfirmModal = create<ModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useConfirmModal;
