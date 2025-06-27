import Navbar from '../components/Navbar';
import AddTransactionButton from '../components/AddTransactionButton';
import DashboardRecentTransactions from '../components/DashboardRecentTransactions';
import DashboardGreeting from '../components/DashboardGreeting';
import DashboardMonthlySpendings from '../components/DashboardMonthlySpendings';
import { useEffect } from 'react';
import { useTransactionStore } from '../store/useTransactionStore';
import { useAuthStore } from '../store/useAuth';
import DashboardMonthlySummary from '../components/DashboardMonthlySummary';

const HomePage = () => {

  useEffect(() => {
    const { isAuthenticated } = useAuthStore.getState();
    const { fetchAll } = useTransactionStore.getState();

    if (isAuthenticated) {
      fetchAll(); // only if not already fetched
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-7 px-12">
        <DashboardGreeting />
        <DashboardMonthlySummary />
        <DashboardRecentTransactions />
        <DashboardMonthlySpendings />
        <AddTransactionButton />
      </main>
    </>
  );
};

export default HomePage;
