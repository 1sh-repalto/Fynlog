// src/components/Modal.tsx
import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-lightDark rounded-lg border border-neutral p-4 md:w-lg w-11/12 relative">
        <button
          className="absolute top-3 right-3 text-xl font-bold cursor-pointer bg-rose-700 rounded-sm p-1"
          onClick={onClose}
        >
          <X size={28}/>
        </button>
        {children}
      </div>
    </div>
  );
};
