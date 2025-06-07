import Navbar from '../components/Navbar';
import AddTransactionButton from '../components/AddTransactionButton';
import DashboardCards from '../components/DashboardCards';
import DashboardRecentTransactions from '../components/DashboardRecentTransactions';
import DashboardGreeting from '../components/DashboardGreeting';
import DashboardBreakdownCharts from '../components/DashboardBreakdownCharts';
import DashboardMonthlySpendings from '../components/DashboardMonthlySpendings';

const HomePage = () => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <>
      <Navbar />
      <main className="pt-7 px-12">
        <DashboardGreeting />
        <div className="h-auto w-full rounded-lg bg-lightDark mt-12 p-5">
          <h1 className="text-2xl text-neutral-500 font-semibold ml-2">
            Monthly financial summary - {currentMonth}
          </h1>
          <DashboardCards />
          <DashboardBreakdownCharts />
        </div>
        <div className="h-auto w-full rounded-lg bg-lightDark mt-12 p-5">
          <h1 className="text-2xl text-neutral-500 font-semibold ml-2">Recent Transactions</h1>
          <DashboardRecentTransactions />
        </div>
        <div className="h-auto w-full rounded-lg bg-lightDark mt-12 p-5">
          <h1 className="text-2xl text-neutral-500 font-semibold ml-2">Your spending over last 5 months</h1>
          <DashboardMonthlySpendings />
        </div>
        <div className="h-auto w-full rounded-lg bg-lightDark mt-12 p-5">
          <h1 className="text-2xl text-neutral-500 font-semibold ml-2">Recent Transactions</h1>
          <DashboardRecentTransactions />
        </div>
        <AddTransactionButton />
      </main>
    </>
  );
};

export default HomePage;
