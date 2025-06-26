import { useState } from 'react';
import { expenseCategories } from '../data/defaultCategories';
import { useBudgetStore } from '../store/budgetStore';

interface Props {
  onSuccess?: () => void;
}

export default function BudgetForm({ onSuccess }: Props) {
  const [categoryId, setCategoryId] = useState(expenseCategories[0].id);
  const [amount, setAmount] = useState('');
  const addBudget = useBudgetStore((s) => s.addBudgets);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    await addBudget(categoryId, parseFloat(amount));
    setAmount('');
    if (onSuccess) onSuccess(); // 👈 close modal on success
  };

  return (
    <form onSubmit={handleSubmit} className="flex-col space-y-5 justify-evenly">
      <label htmlFor="category" className="pl-2 font-semibold block" />
        Category
        <select
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="p-2 border rounded w-full mt-2"
        >
          {expenseCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

      <label htmlFor="budgetAmount" className='pl-2 font-semibold block' />
        Budget Amount
        <input
          id="budgetAmount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border rounded w-full mt-2"
        />

      <button
        type="submit"
        className="mt-4 font-semibold border border-secondary text-secondary hover:bg-secondary hover:text-neutral cursor-pointer transition duration-200 px-4 py-2 rounded w-full"
      >
        Add Budget
      </button>
    </form>
  );
}
