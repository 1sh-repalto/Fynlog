import { useState } from "react";
import { expenseCategories } from "../data/defaultCategories";
import { useBudgetStore } from "../store/budgetStore";

export default function BudgetForm() {
  const [categoryId, setCategoryId] = useState(expenseCategories[0].id);
  const [amount, setAmount] = useState("");
  const addBudget = useBudgetStore((s) => s.addBudgets);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    await addBudget(categoryId, parseFloat(amount));
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        className="p-2 border rounded"
      >
        {expenseCategories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-2 border rounded w-full"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Budget
      </button>
    </form>
  );
}
