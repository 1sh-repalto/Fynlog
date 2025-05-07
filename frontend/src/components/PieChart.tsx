import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Tooltip, Legend, ArcElement);

interface PieChartProps {
  title: String;
  data: { label: string; value: number; color: string }[];
}

const PieChart = ({ title, data }: PieChartProps) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) => item.color),
        borderWidth: 0,
      },
    ],
  };
  
  return (
    <div className="bg-lighterDark rounded-md p-4 w-full md:w-1/2">
      <h2 className="text-neutral text-xl font-semibold text-center mb-2">
        {title}
      </h2>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
