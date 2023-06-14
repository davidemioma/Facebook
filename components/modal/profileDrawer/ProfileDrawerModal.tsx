import React, { useCallback, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawerModal = ({ children, isOpen, onClose }: Props) => {
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
        className="fixed inset-0 z-40 overflow-hidden"
        onClick={handleClose}
      />

      <div
        className={`absolute inset-0 z-30 bg-black/70 transition-opacity duration-500 ${
          showModal ? "opacity-100 ease-out" : "opacity-0 ease-in"
        }`}
      />

      <div
        className={`absolute inset-y-0 right-0 z-40 w-full max-w-md overflow-y-auto overflow-x-hidden bg-white py-6 ${
          showModal
            ? "translate-x-0 duration-500"
            : "translate-x-full duration-200"
        } shadow-xl transition ease-in-out`}
      >
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-end">
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

export default ProfileDrawerModal;
