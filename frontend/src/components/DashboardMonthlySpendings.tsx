// components/DashboardMonthlySpendings.tsx
import { useEffect, useState } from 'react';
import MonthlySpendingBarChart from './MonthlySpendingBarChart';
import { fetchMonthlyTransactions } from '../api/transactions';
import type { Transaction } from '../types';
import { useTransactionStore } from '../store/useTransactionStore';
import Twemoji from 'react-twemoji';

const getLastFiveMonths = (): { label: string; key: string }[] => {
  const months = [];
  const now = new Date();

  for (let i = 4; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    months.push({ label, key });
  }

  return months;
};

const DashboardMonthlySpendings = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [expenses, setExpenses] = useState<number[]>([]);
  const [income, setIncome] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const transactions = useTransactionStore((state) => state.transactions);

  useEffect(() => {
    const loadMonthlySpendings = async () => {
      const months = getLastFiveMonths();
      setLabels(months.map((m) => m.label));

      const incomeData: number[] = [];
      const expenseData: number[] = [];

      for (const month of months) {
        try {
          const monthlyTxs: Transaction[] = await fetchMonthlyTransactions(month.key);

          const totalIncome = monthlyTxs
            .filter((t) => t.type === 'income')
            .reduce((sum, tx) => sum + Number(tx.amount), 0);

          const totalExpense = monthlyTxs
            .filter((t) => t.type === 'expense')
            .reduce((sum, tx) => sum + Number(tx.amount), 0);

          incomeData.push(totalIncome);
          expenseData.push(totalExpense);
        } catch (err) {
          incomeData.push(0);
          expenseData.push(0);
        }
      }

      setIncome(incomeData);
      setExpenses(expenseData);
      setLoading(false);
    };

    loadMonthlySpendings();
  }, [transactions]);

  if (loading) return <p className="text-sm text-muted">Loading monthly spendings...</p>;

  const noDataAvailable = income.every((amt) => amt === 0) && expenses.every((amt) => amt === 0);
  if (noDataAvailable) {
    return (
      <div className="h-auto w-full rounded-lg bg-lightDark my-12 p-5">
        <div className="flex gap-3 items-center">
          <h1 className="text-3xl text-neutral-500 font-semibold ml-2">Past Financial Trends</h1>
          <Twemoji options={{ className: '' }}>
            <span className="w-10 h-10 inline-block">📊</span>
          </Twemoji>
        </div>
        <p className="text-xl font-semibold text-center py-5 text-neutral-600">
          No data available. Add transactions.
        </p>
      </div>
    );
  }

  return (
    <div className="h-auto w-full rounded-lg bg-lightDark my-12 p-5">
      <div className="flex gap-3 items-center">
        <h1 className="text-3xl text-neutral-500 font-semibold ml-2">Past Financial Trends</h1>
        <Twemoji options={{ className: '' }}>
          <span className="w-10 h-10 inline-block">📊</span>
        </Twemoji>
      </div>
      <div className="p-5 mt-2">
        <MonthlySpendingBarChart labels={labels} expenses={expenses} income={income} />
      </div>
      <div className="mb-2 flex justify-center gap-8 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 rounded" style={{ backgroundColor: '#10B981' }} />
          <span>Income</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 rounded" style={{ backgroundColor: '#bc544b' }} />
          <span>Expenses</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardMonthlySpendings;
