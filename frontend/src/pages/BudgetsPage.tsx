import { useState, useEffect } from 'react';
import Twemoji from 'react-twemoji';
import BudgetForm from '../components/BudgetForm';
import BudgetListItem from '../components/BudgetListItem';
import Navbar from '../components/Navbar';
import { useBudgetStore } from '../store/budgetStore';
import { useAuthStore } from '../store/useAuth';
import { useTransactionStore } from '../store/useTransactionStore';
import { getCategoryById } from '../utils/getCategoryById';
import { X } from 'lucide-react';

export default function BudgetPage() {
  const { budgets, fetchBudgets } = useBudgetStore();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const { isAuthenticated } = useAuthStore.getState();
    const { fetchAll } = useTransactionStore.getState();

    if (isAuthenticated) {
      fetchAll();
    }
    fetchBudgets();
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-7 px-12">
        <div className="flex justify-between items-end">
          <div className="flex gap-4 items-center mt-10">
            <h1 className="text-neutral text-5xl font-bold">Your Budgets</h1>
            <Twemoji options={{ className: '' }}>
              <span className="w-12 h-12 inline-block">🎯</span>
            </Twemoji>
          </div>
          <div>
            <button
              onClick={() => setShowModal(true)}
              className="border border-accent text-accent text-lg font-medium rounded-md h-12 w-full px-6 mt-6 hover:bg-accent hover:text-neutral transition duration-200 cursor-pointer"
            >
              Add New Budget
            </button>
          </div>
        </div>

        <div className="bg-lightDark p-5 mt-10 rounded-md">
          {budgets.length === 0 ? (
            <p className="text-xl font-semibold text-center py-5 text-neutral-600">
              No data available. Add budgets.
            </p>
          ) : (
            <ul className="space-y-5">
              {budgets.map((budget) => {
                const category = getCategoryById(budget.categoryId);
                return <BudgetListItem key={budget.id} budget={budget} category={category} />;
              })}
            </ul>
          )}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="auto bg-lightDark rounded-xl p-6 shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-xl font-bold cursor-pointer bg-rose-800 rounded-sm p-1 hover:bg-rose-700"
            >
              <X />
            </button>
            <h2 className="text-2xl font-bold mb-4">Add Budget</h2>
            <BudgetForm onSuccess={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}
