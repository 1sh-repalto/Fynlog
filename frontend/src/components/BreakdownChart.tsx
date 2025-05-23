import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface BreakdownChartProps {
  labels: string[];
  data: number[];
  colors: string[];
}

const BreakdownChart = ({ labels, data, colors }: BreakdownChartProps) => {
  return (
    <div className="h-full w-8/10 p-4 flex justify-center items-center mx-auto">
      <Doughnut
        data={{
          labels,
          datasets: [
            {
              data,
              backgroundColor: colors,
              borderWidth: 6,
              borderColor: "#303030",
              
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 35,
                color: "#ECF0F1",
                font: {
                  size: 16,
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default BreakdownChart;
