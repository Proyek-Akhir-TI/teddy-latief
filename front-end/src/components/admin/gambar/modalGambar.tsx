// src/components/admin/gambar/modal.tsx
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
        <span
          onClick={onClose}
          className="absolute top-0 right-0 p-4 cursor-pointer text-2xl"
        >
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
