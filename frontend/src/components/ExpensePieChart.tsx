import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTransactionStore } from "../store/transactionStore";
import { expenseCategories } from "../data/defautCategories";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart: React.FC = () => {
  const { transactions, loading } = useTransactionStore();

  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  const categorySums: { [key: number]: number } = {};
  expenseTransactions.forEach((t) => {
    categorySums[t.categoryId] = (categorySums[t.categoryId] || 0) + t.amount;
  });

  const filteredCategories = expenseCategories.filter((cat) => categorySums[cat.id] > 0);

  const pieData = {
    labels: filteredCategories.map((cat) => cat.name),
    datasets: [
      {
        data: filteredCategories.map((cat) => categorySums[cat.id]),
        backgroundColor: filteredCategories.map((cat) => cat.color),
        borderWidth: 1,
      },
    ],
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-2 text-center">Expenses by Category</h2>
      <Pie data={pieData} />
    </div>
  );
};

export default ExpensePieChart;
