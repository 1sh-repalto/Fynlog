import { Transaction, Category } from '../types';

interface ChartData {
  labels: string[];
  data: number[];
  colors: string[];
}

export const getChartDataByType = (
  transactions: Transaction[],
  categories: Category[],
  type: 'income' | 'expense',
  selectedMonth: string,
): ChartData => {
  const [selectedYear, selectedMonthNum] = selectedMonth.split('-').map(Number);

  const monthlyTransactions = transactions.filter((tx) => {
    if (!tx.date) return false;
    const txDate = new Date(tx.date);
    return (
      txDate.getFullYear() === selectedYear &&
      txDate.getMonth() + 1 === selectedMonthNum &&
      tx.type === type
    );
  });

  const totals = monthlyTransactions.reduce<Record<number, number>>((acc, tx) => {
    acc[tx.categoryId] = (acc[tx.categoryId] || 0) + Number(tx.amount);
    return acc;
  }, {});

  const result = categories
    .filter((cat) => totals[cat.id])
    .map((cat) => ({
      label: cat.name,
      value: totals[cat.id],
      color: cat.color,
    }));

  return {
    labels: result.map((r) => r.label),
    data: result.map((r) => r.value),
    colors: result.map((r) => r.color),
  };
};
