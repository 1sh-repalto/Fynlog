import Twemoji from 'react-twemoji';
import BudgetForm from '../components/BudgetForm';
import BudgetListItem from '../components/BudgetListItem';
import Navbar from '../components/Navbar';
import { useBudgetStore } from '../store/budgetStore';
import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuth';
import { useTransactionStore } from '../store/useTransactionStore';

export default function BudgetPage() {
  const { budgets, fetchBudgets } = useBudgetStore();

    useEffect(() => {
      const { isAuthenticated } = useAuthStore.getState();
      const { fetchAll } = useTransactionStore.getState();

      if (isAuthenticated) {
        fetchAll(); // only if not already fetched
      }
      fetchBudgets();
    }, []);
    
  return (
    <>
      <Navbar />
      <main className="pt-7 px-12">
        <div className="flex gap-4 items-center mt-10">
          <h1 className="text-neutral text-5xl font-bold">Your Budgets</h1>
          <Twemoji options={{ className: '' }}>
            <span className="w-12 h-12 inline-block">🎯</span>
          </Twemoji>
        </div>

        <div className="bg-lightDark p-5 mt-10 rounded-md">
          <ul className="space-y-5">
            {budgets.map((budgetItem) => {
              return <BudgetListItem key={budgetItem.id.toString()} budget={budgetItem} />;
            })}
          </ul>
        </div>
      </main>
    </>
  );
}
