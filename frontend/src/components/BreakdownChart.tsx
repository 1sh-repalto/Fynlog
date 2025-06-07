import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface BreakdownChartProps {
  labels: string[];
  data: number[];
  colors: string[];
}

const BreakdownChart = ({ labels, data, colors }: BreakdownChartProps) => {
  return (
    <div className="h-full w-8/10 p-4 flex flex-col items-center mx-auto">
      <div className="h-9/10 w-9/10">
        <Doughnut
          data={{
            labels,
            datasets: [
              {
                data,
                backgroundColor: colors,
                borderWidth: 6,
                borderColor: '#303030',
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              }
            },
          }}
        />
      </div>
      {/* <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-300">
        {labels.map((label, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-4 h-4 rounded" style={{ backgroundColor: colors[index] }} />
            <span>{label}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default BreakdownChart;
