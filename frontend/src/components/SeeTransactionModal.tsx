import React from "react";
import { Transaction } from "../store/transactionStore";
import { incomeCategories, expenseCategories } from "../data/defautCategories";
import { X } from "lucide-react";

interface SeeTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

const SeeTransactionModal: React.FC<SeeTransactionModalProps> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  if (!isOpen || !transaction) return null;

  const { type, amount, date, description, categoryId } = transaction;
  const allCategories = [...incomeCategories, ...expenseCategories];
  const category = allCategories.find((cat) => cat.id === categoryId);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="h-auto w-[90%] max-w-xl bg-lightDark rounded-lg border border-neutral p-4 mx-5 relative">
        <button
          className="absolute top-3 right-3 text-xl font-bold cursor-pointer bg-rose-800 rounded-sm p-1 hover:bg-rose-700"
          onClick={onClose}
        >
          <X size={28} />
        </button>
        <h2 className="text-3xl font-bold pl-4 h-1/10">Transaction Details</h2>
        <div className="text-neutral pl-4 h-9/10 mt-10 text-xl flex flex-col justify-evenly">
          <div className="flex items-center">
            <p className="text-2xl font-semibold w-1/2">Type</p>
            <p
              className={`font-semibold ${
                type === "income" ? "text-secondary" : "text-rose-700"
              }`}
            >
              {type === "income" ? "Income" : "Expense"}
            </p>
          </div>
          <hr className="my-4 border-t border-neutral-700" />
          <div className="flex items-center">
            <p className="text-2xl font-semibold w-1/2">Category</p>
            <p className="font-semibold">
              {category?.name || `ID: ${categoryId}`}
            </p>
          </div>
          <hr className="my-4 border-t border-neutral-700" />
          <div className="flex items-center">
            <p className="text-2xl font-semibold w-1/2">Amount</p>
            <p className="font-semibold">₹ {Number(amount).toFixed(2)}</p>
          </div>
          <hr className="my-4 border-t border-neutral-700" />
          <div className="flex items-center">
            <p className="text-2xl font-semibold w-1/2">Date</p>{" "}
            <p className="font-semibold">
              {new Date(date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
            </p>
          </div>
          <hr className="my-4 border-t border-neutral-700" />
          <div className="flex items-center">
            <p className="text-2xl font-semibold w-1/2">Time</p>
            <p className="font-semibold">
              {new Date(date).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
          <hr className="my-4 border-t border-neutral-700" />
          <div className="flex">
            <p className="text-2xl font-semibold w-1/2">Description</p>
            <div className="h-20 w-1/2 border border-neutral-400 overflow-y-auto p-2 rounded-md bg-muted text-sm text-neutral-700 dark:text-neutral-300 break-words">
              {description || "No description"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeTransactionModal;
