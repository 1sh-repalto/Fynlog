import React from 'react';
import Modal from './Modal';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const AddTransactionModal = ({ isOpen, onClose, children }: AddTransactionModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} widthClass="h-[90vh] w-lg">
      <div className="h-full">{children}</div>
    </Modal>
  );
};
