import Navbar from "../components/Navbar";
import AddTransactionButton from "../components/AddTransactionButton";
import DashboardCards from "../components/DashboardCards";
import DashboardRecentTransactions from "../components/DashboardRecentTransactions";
import DashboardGreeting from "../components/DashboardGreeting";
import DashboardBreakdownCharts from "../components/DashboardBreakdownCharts";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <main className="pt-7 px-12">
        <DashboardGreeting />
        <div className="h-auto w-full rounded-lg bg-lightDark mt-12 p-5">
          <div className="md:flex space-y-2">
            <DashboardCards />
            <DashboardRecentTransactions />
          </div>
          <DashboardBreakdownCharts />
        </div>
        <AddTransactionButton />
      </main>
    </>
  );
};

export default HomePage;
