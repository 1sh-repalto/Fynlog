import { Transaction } from "../types";

export function getMonthlyCategorySpend(
  transactions: Transaction[],
  categoryId: Number,
  month: string
): number {
  return transactions
    .filter((t) => {
      return (
        t.categoryId === categoryId &&
        t.type === "expense" &&
        t.date.startsWith(month)
      );
    })
    .reduce((sum, t) => sum + parseFloat(t.amount.toString()), 0);
}
