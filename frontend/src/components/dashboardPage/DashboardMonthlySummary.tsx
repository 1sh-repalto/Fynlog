import Twemoji from 'react-twemoji';
import DashboardCards from './DashboardCards';
import DashboardBreakdownCharts from './DashboardBreakdownCharts';

const DashboardMonthlySummary = () => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="h-auto w-full rounded-lg bg-lightDark mt-12 p-5">
      <div className="flex gap-3 items-center">
        <h1 className="text-3xl text-neutral-500 font-semibold ml-2">Summary for {currentMonth}</h1>
        <Twemoji options={{ className: '' }}>
          <span className="w-10 h-10 inline-block">🗓️</span>
        </Twemoji>
      </div>
      <DashboardCards />
      <DashboardBreakdownCharts />
    </div>
  );
};

export default DashboardMonthlySummary;
