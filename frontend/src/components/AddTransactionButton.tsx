import React, { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { AddTransactionModal } from './AddTransactionModal';
import { incomeCategories, expenseCategories } from '../data/defaultCategories';
import { useAuthStore } from '../store/useAuth';
import { useTransactionStore } from '../store/useTransactionStore';
import { toast } from 'react-toastify';

export default function AddTransactionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');

  const [type, setType] = useState('');
  const [category, setCategory] = useState('');

  const categories = type === 'income' ? incomeCategories : expenseCategories;

  const { user } = useAuthStore();
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCategory = categories.find((cat) => cat.name === category);

    if (!selectedCategory || !user) {
      console.error('Invalid category or user not found');
      return;
    }

    const transactionData = {
      userId: user.id,
      categoryId: selectedCategory.id,
      amount: parseFloat(amount),
      type: (type as 'income') || 'expense',
      date: new Date().toISOString(),
      description: desc.trim() || undefined,
    };
    
    try {
      await addTransaction(transactionData);

      setAmount('');
      setDesc('');
      setCategory('');
      setType('');
      setIsOpen(false);
    } catch {
      toast.error('Error while fetching data.');
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 group">
        <button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-lg bg-accent text-neutral flex justify-center items-center transition-transform duration-200 hover:scale-110 focus:outline-none"
          aria-describedby="add-tooltip"
        >
          <Plus size={36} />
        </button>
        <div
          id="add-tooltip"
          className="absolute bottom-16 left-1 -translate-x-1/2 bg-lightDark text-neutral text-sm px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap"
        >
          Add transaction
        </div>
      </div>

      <AddTransactionModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-3xl font-semibold ml-4">Add Transaction</h2>
        <form onSubmit={handleSubmit} className="py-8 px-16 flex-col h-5/6 space-y-2">
          <label htmlFor="amount" className="pl-2 font-semibold block w-4/5 mx-auto">
            Amount
          </label>
          <input
            required
            id="amount"
            type="number"
            placeholder="Enter transaction amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block bg-lighterDark rounded-md mx-auto mt-2 mb-6 w-7/8 px-4 p-2 outline-none border border-transparent focus:border-neutral"
          />

          <label htmlFor="type" className="pl-2 font-semibold block w-4/5 mx-auto">
            Type
          </label>
          <div className="relative w-7/8 mx-auto mb-6">
            <select
              required
              value={type}
              className={`block appearance-none bg-lighterDark w-full rounded-md px-4 p-2 focus:border-neutral ${
                type === '' ? 'text-neutral-400' : 'text-white'
              }`}
              onChange={(e) => {
                setType(e.target.value);
                setCategory('');
              }}
            >
              <option value="" disabled hidden>
                Select transaction type
              </option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <ChevronDown
              size={20}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral cursor-pointer"
            />
          </div>

          <label htmlFor="category" className="pl-2 font-semibold block w-4/5 mx-auto">
            Category
          </label>
          <div className="relative w-7/8 mx-auto mb-6">
            <select
              required
              value={category}
              className={`block appearance-none bg-lighterDark w-full h-10 rounded-md pl-4 pr-10 ${
                category === '' ? 'text-neutral-400' : 'text-neutral'
              }`}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              disabled={!type}
            >
              <option value="" disabled hidden>
                Select transaction category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <ChevronDown
              size={20}
              className={`pointer-events-none absolute right-3 -translate-y-1/2 cursor-pointer ${
                type ? 'top-1/2 text-neutral' : 'top-1/4 text-neutral-400'
              }`}
            />

            {!type && (
              <p className="italic text-xs text-warning mt-2">
                Please select the transaction type first to enable category selection.
              </p>
            )}
          </div>

          <label htmlFor="description" className="pl-2 font-semibold block w-4/5 mx-auto">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            placeholder="Add some description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="resize-none block bg-lighterDark rounded-md mx-auto mt-2 mb-6 w-7/8 p-4 outline-none border border-transparent focus:border-neutral"
          ></textarea>

          <div className="flex justify-center">
            <button
              type="submit"
              className="border border-secondary text-secondary text-lg font-medium rounded-md h-12 w-7/8 px-6 mt-6 hover:bg-secondary hover:text-neutral hover:drop-shadow-[0px_0px_8px_rgba(39,174,96,0.8)] active:drop-shadow-none active:bg-[#208049] transition duration-200"
            >
              Add
            </button>
          </div>
        </form>
      </AddTransactionModal>
    </>
  );
}
