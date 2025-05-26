import React, { useEffect } from "react";
import { X } from "lucide-react";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const AddTransactionModal = ({ isOpen, onClose, children }: AddTransactionModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="h-[90vh] bg-lightDark rounded-lg border border-neutral p-4 w-lg mx-5 relative">
        <button
          className="absolute top-3 right-3 text-xl font-bold cursor-pointer bg-rose-800 rounded-sm p-1 hover:bg-rose-700"
          onClick={onClose}
        >
          <X size={28} />
        </button>
        <div onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
};
