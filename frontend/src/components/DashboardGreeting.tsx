import { useEffect } from 'react';
import { useTransactionStore } from '../store/useTransactionStore';
import { useAuthStore } from '../store/useAuth';

const DashboardGreeting = () => {
  const { fetchTransactions, selectedMonth, setSelectedMonth } = useTransactionStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (selectedMonth) {
      fetchTransactions(selectedMonth);
    }
  }, [selectedMonth, fetchTransactions]);

  if (!user) {
    return <h1>No user detected</h1>;
  }

  const recentMonths = Array.from({ length: 5 }, (_, i) => {
    // Create a fresh date object each iteration
    const date = new Date();
    // Use a new date object to avoid mutating the original
    const adjusted = new Date(date.getFullYear(), date.getMonth() - i, 1);
    return {
      value: `${adjusted.getFullYear()}-${String(adjusted.getMonth() + 1).padStart(2, '0')}`,
      label: `${adjusted.toLocaleString('default', {
        month: 'long',
      })}, ${adjusted.getFullYear()}`,
    };
  });

  return (
    <>
      <h1 className="text-neutral text-5xl font-bold mt-10">Hello, {`${user.name}`}</h1>
      <div className="md:flex md:items-baseline md:gap-2 mt-2">
        <p className="text-neutral text-md italic">Here's your financial summary for </p>
        <select
          value={selectedMonth}
          className="w-auto p-2 rounded-md bg-lightDark border text-md italic mt-2"
          onChange={(e) => {
            setSelectedMonth(e.target.value);
          }}
        >
          {recentMonths.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default DashboardGreeting;
