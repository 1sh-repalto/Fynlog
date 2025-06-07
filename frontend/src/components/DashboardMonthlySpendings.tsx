// components/DashboardMonthlySpendings.tsx
import { useEffect, useState } from 'react';
import MonthlySpendingBarChart from './MonthlySpendingBarChart';
import { fetchMonthlyTransactions } from '../api/transactions';
import type { Transaction } from '../types';

const getLastFiveMonths = (): { label: string; key: string }[] => {
  const months = [];
  const now = new Date();

  for (let i = 4; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = date.toLocaleString('default', { month: 'short' }); // e.g. "Feb"
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // e.g. "2025-02"
    months.push({ label, key });
  }

  return months;
};

const DashboardMonthlySpendings = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [spendingData, setSpendingData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMonthlySpendings = async () => {
      const months = getLastFiveMonths();
      setLabels(months.map((m) => m.label));

      const data: number[] = [];

      for (const month of months) {
        try {
          const transactions: Transaction[] = await fetchMonthlyTransactions(month.key);
          const totalExpense = transactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, tx) => sum + Number(tx.amount), 0);
          data.push(totalExpense); 
        } catch (err) {
          data.push(); // fallback if error occurs
        }
      }

      setSpendingData(data);
      setLoading(false);
    };

    loadMonthlySpendings();
  }, []);

  if (loading) return <p className="text-sm text-muted">Loading monthly spendings...</p>;

  return (
    <div className="bg-lightDark rounded-xl p-6 shadow-md">
      <MonthlySpendingBarChart labels={labels} data={spendingData} />
    </div>
  );
};

export default DashboardMonthlySpendings;
