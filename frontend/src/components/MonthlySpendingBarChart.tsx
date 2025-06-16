// components/MonthlySpendingBarChart.tsx
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

interface MonthlySpendingBarChartProps {
  labels: string[];
  expenses: number[];
  income: number[];
}

const MonthlySpendingBarChart = ({ labels, expenses, income }: MonthlySpendingBarChartProps) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: income,
        backgroundColor: '#10B981',           // emerald-500
        hoverBackgroundColor: '#34D399',      // emerald-400
        borderRadius: 6,
        barPercentage: 0.8,
        categoryPercentage: 0.7,
      },
      {
        label: 'Expenses',
        data: expenses,
        backgroundColor: '#bc544b',
        hoverBackgroundColor: '#e07267',
        borderRadius: 6,
        barPercentage: 0.8,
        categoryPercentage: 0.7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F3F4F6',
        bodyColor: '#E5E7EB',
        callbacks: {
          label: (ctx: any) => `₹ ${ctx.raw}`,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#D1D5DB',
          font: { size: 12 },
          callback: (value: number | string) => `₹${value}`,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
      },
      x: {
        ticks: {
          color: '#D1D5DB',
          font: { size: 12 },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
      },
    },
  };

  return (
    <div className="w-full h-72 p-4 bg-transparent">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default MonthlySpendingBarChart;
