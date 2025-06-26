import { useMemo } from 'react';
import { useTransactionStore } from '../store/useTransactionStore';
import { Budget, Category } from '../types';
import { getMonthlyCategorySpend } from '../utils/getMonthlyCategorySpend';
import Twemoji from 'react-twemoji';
import { Trash2, AlertTriangle } from 'lucide-react';
import { useBudgetStore } from '../store/budgetStore';

interface Props {
  budget: Budget;
  category: Category | undefined;
}

export default function BudgetListItem({ budget, category }: Props) {
  const transactions = useTransactionStore((s) => s.transactions);
  const deleteBudgetFromStore = useBudgetStore((s) => s.deleteBudget);

  const spent = useMemo(() => {
    return getMonthlyCategorySpend(transactions, budget.categoryId, budget.month);
  }, [transactions, budget]);

  const percentage = Math.min((spent / Number(budget.amount)) * 100, 100);
  const isExceeded = spent > Number(budget.amount);

  const deleteBudget = async () => {
    if (confirm("Are you sure you want to delete this budget?")) {
      await deleteBudgetFromStore(budget.id);
    }
  }

  return (
    <li
      key={budget.id.toString()}
      className="h-32 flex justify-center items-center bg-lighterDark p-3 rounded-md"
    >
      <div className="h-full flex items-center justify-center px-3">
        <Twemoji options={{ className: '' }}>
          <span className="w-10 h-10 inline-block">{category?.emoji}</span>
        </Twemoji>
      </div>

      <div className="h-full w-full flex flex-col justify-evenly mx-3">
        <div className="flex items-center gap-3">
          <p className="text-neutral font-semibold text-2xl">{category?.name || 'No Category'}</p>
          {isExceeded && (
            <>
              <AlertTriangle className="text-warning" size={22} />
              <p className="text-warning font-semibold">Budget exceeded</p>
            </>
          )}
        </div>

        <div className="h-full w-full py-4 rounded overflow-hidden">
          <div
            className={`h-6 rounded ${isExceeded ? "bg-warning" : "bg-secondary "} transition-[width] duration-700 ease-in-out`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <div className="text-center font-semibold text-neutral-400">
          ₹{spent.toFixed(0)} / ₹{Number(budget.amount).toFixed(0)}
        </div>
      </div>

      <div className="h-14 flex justify-center items-center px-3 mx-3 cursor-pointer border rounded-md border-rose-700 text-rose-700 hover:bg-rose-700 hover:text-neutral transition-colors duration-200"
      onClick={deleteBudget}>
        <Trash2 size={32} />
      </div>
    </li>
  );
}
