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
): ChartData => {
  const totals = transactions
    .filter((tx) => tx.type === type)
    .reduce<Record<number, number>>((acc, tx) => {
      acc[tx.categoryId] = (acc[tx.categoryId] || 0) + tx.amount;
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
