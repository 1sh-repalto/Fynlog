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
  labels: string[]; // e.g. ['Feb', 'Mar', 'Apr', 'May', 'Jun']
  data: number[];   // e.g. [1200, 800, 950, 1020, 780]
}

const MonthlySpendingBarChart = ({ labels, data }: MonthlySpendingBarChartProps) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Monthly Spending',
        data,
        backgroundColor: '#10B981', // emerald-500
        borderRadius: 6,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
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
          callback: (tickValue: string | number) => `₹${tickValue}`,
        },
        grid: {
          color: '#3a3a3a',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full h-72 p-4">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default MonthlySpendingBarChart;
