import { Transaction } from "../store/transactionStore";
import { Category } from "../data/defautCategories";

export const getChartDataByType = (
  transaction: Transaction[],
  categories: Category[],
  type: "income" | "expense"
) => {
  const filtered = transaction.filter((tx) => tx.type === type);

  const totals: { [key: number]: number } = {};
  filtered.forEach((tx) => {
    totals[tx.categoryId] = (totals[tx.categoryId] || 0) + tx.amount;
  });

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
