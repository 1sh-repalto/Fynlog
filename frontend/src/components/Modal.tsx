import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  widthClass?: string;
}

const Modal = ({ isOpen, onClose, children, widthClass = 'max-w-xl' }: ModalProps) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-lightDark rounded-lg border border-neutral p-4 mx-5 relative w-[90%] ${widthClass}`}
      >
        <button
          className="absolute top-3 right-3 text-xl font-bold cursor-pointer bg-rose-800 rounded-sm p-1 hover:bg-rose-700"
          onClick={onClose}
        >
          <X size={28} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
