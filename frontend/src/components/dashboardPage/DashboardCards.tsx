import { useTransactionStore } from '../../store/useTransactionStore';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

const DashboardCards = () => {
  const { transactions, selectedMonth } = useTransactionStore();

  const filteredTransactions =
    transactions?.filter((tx) => {
      if (!tx.date) return false;
      const txDate = new Date(tx.date);
      const [selectedYear, selectedMonthNum] = selectedMonth.split('-').map(Number);
      return txDate.getFullYear() === selectedYear && txDate.getMonth() + 1 === selectedMonthNum;
    }) || [];

  const income = filteredTransactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

  const expense = filteredTransactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

  const balance = income - expense;

  return (
    <div className="w-full flex flex-col md:flex-row justify-evenly gap-4 my-4">
      {/* Balance Card */}
      <div className="flex-1 bg-lighterDark rounded-md p-3 min-h-[140px]">
        <h1 className="text-lg md:text-xl text-neutral-500 font-semibold mb-2 ml-2">Balance</h1>
        <div className="flex items-center justify-evenly">
          <Wallet size={48} className="text-amber-400 shrink-0 w-5/20" />
          <p className="text-4xl w-15/20 md:text-3xl lg:text-4xl font-semibold tracking-wide text-neutral text-center truncate">
            ₹ {Math.abs(balance).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Income Card */}
      <div className="flex-1 bg-lighterDark rounded-md p-3 min-h-[140px]">
        <p className="text-lg md:text-xl text-neutral-500 font-semibold mb-2 ml-2">Income</p>
        <div className="flex items-center justify-center">
          <TrendingUp size={48} className="text-secondary shrink-0 w-5/20" />
          <p className="text-4xl w-15/20 text-center md:text-3xl lg:text-4xl font-semibold tracking-wide text-neutral truncate">
            ₹ {income.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Expense Card */}
      <div className="flex-1 bg-lighterDark rounded-md p-3 min-h-[140px]">
        <p className="text-lg md:text-xl text-neutral-500 font-semibold mb-2 ml-2">Expense</p>
        <div className="flex items-center justify-evenly">
          <TrendingDown size={48} className="text-rose-700 shrink-0 w-5/20" />
          <p className="text-4xl w-15/20 md:text-3xl lg:text-4xl font-semibold tracking-wide text-neutral truncate text-center">
            ₹ {expense.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
