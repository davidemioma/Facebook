import React, { useCallback, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

interface Props {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
}

const ConfirmModal = ({ isOpen, onClose, children }: Props) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 700);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 overflow-hidden"
        onClick={handleClose}
      />

      <div
        className={`absolute inset-0 z-40 bg-gray-500/75 transition-opacity ${
          showModal
            ? "opacity-100 duration-300 ease-out"
            : "opacity-0 duration-200 ease-in"
        }`}
      />

      <div className="absolute left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden sm:max-w-lg">
        <div
          className={`w-full rounded-lg bg-white p-4 shadow-xl transition-all ease-in-out sm:p-6 ${
            showModal
              ? "-translate-y-0 opacity-100 duration-300"
              : "translate-y-4 opacity-0 duration-200"
          }`}
        >
          <div className="flex items-center justify-end pb-4">
            <button
              className="rounded-full bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              onClick={handleClose}
              type="button"
            >
              <IoClose size={24} />
            </button>
          </div>

          {children}
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
