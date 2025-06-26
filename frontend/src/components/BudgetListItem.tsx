import { useMemo } from 'react';
import { expenseCategories } from '../data/defaultCategories';
import { useTransactionStore } from '../store/useTransactionStore';
import { Budget } from '../types';
import { getMonthlyCategorySpend } from '../utils/getMonthlyCategorySpend';

interface Props {
  budget: Budget;
}

export default function BudgetListItem({ budget }: Props) {
  const transactions = useTransactionStore((s) => s.transactions);

  const spent = useMemo(() => {
    return getMonthlyCategorySpend(transactions, budget.categoryId, budget.month);
  }, [transactions, budget]);

  const getCategoryName = (id: Number) =>
    expenseCategories.find((c) => c.id === id)?.name || 'Unknown';

  const percentage = Math.min((spent / Number(budget.amount)) * 100, 100);

  return (
    <li
      key={budget.id.toString()}
      className="h-28 px-8 flex flex-col justify-center bg-lighterDark p-3 rounded-md hover:scale-102 cursor-pointer transition-transform duration-200 transform"
    >
      <div className="flex justify-between mb-1">
        <p className="font-semibold">{getCategoryName(budget.categoryId)}</p>
        <p className="text-sm text-gray-300">
          ₹{spent.toFixed(2)} / ₹{budget.amount}
        </p>
      </div>

      <div className="w-full h-3 rounded bg-gray-700 overflow-hidden">
        <div
          className={`h-full rounded bg-green-500 transition-[width] duration-700 ease-in-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </li>
  );
}
