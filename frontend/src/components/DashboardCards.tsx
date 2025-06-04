import { useTransactionStore } from '../store/useTransactionStore';
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

  const income = filteredTransactions.length
    ? transactions
        .filter((tx) => tx.type === 'income')
        .reduce((sum, tx) => sum + Number(tx.amount || 0), 0)
    : 0;

  const expense = filteredTransactions.length
    ? transactions
        .filter((tx) => tx.type === 'expense')
        .reduce((sum, tx) => sum + Number(tx.amount || 0), 0)
    : 0;

  const balance = income - expense;

  return (
    <div className="w-full flex justify-evenly gap-4 mb-4">
      <div className="w-full h-35 p-3 bg-lighterDark rounded-md flex items-center justify-evenly">
        <Wallet size={50} className="text-yellow-300" />
        <div className="w-[60%] flex flex-col items-start">
          <h1 className="text-xl text-neutral-500 font-semibold">Balance</h1>
          <p
            className={`text-4xl font-semibold mt-1 tracking-wider ${
              balance > 0 ? 'text-secondary' : balance < 0 ? 'text-rose-700' : 'text-neutral'
            }`}
          >
            {balance > 0 ? (
              <>&#43; &#8377; {balance.toFixed(2)}</>
            ) : balance < 0 ? (
              <>&#8722; &#8377; {Math.abs(balance).toFixed(2)}</>
            ) : (
              <>&#8377; 0.00</>
            )}
          </p>
        </div>
      </div>

      <div className="w-full h-35 p-3 bg-lighterDark rounded-md flex items-center justify-evenly">
        <TrendingUp size={50} className="text-secondary" />
        <div className="w-[60%] flex flex-col items-start">
          <p className="text-xl text-neutral-500 font-semibold">Income</p>
          <p
            className={`text-4xl font-semibold mt-1 tracking-wider ${
              income === 0 ? 'text-neutral' : 'text-secondary'
            }`}
          >
            {income === 0 ? `\u20B9 0.00` : <>&#43; &#8377; {income.toFixed(2)}</>}
          </p>
        </div>
      </div>

      <div className="w-full h-35 bg-lighterDark rounded-md flex justify-evenly items-center">
        <TrendingDown size={50} className="text-rose-700" />
        <div className="w-[60%] flex flex-col items-start">
          <h1 className="text-xl text-neutral-500 font-semibold">Expense</h1>
          <p
            className={`text-4xl font-semibold mt-1 tracking-wider ${
              expense === 0 ? 'text-neutral' : 'text-rose-700'
            }`}
          >
            {expense === 0 ? `\u20B9 0.00` : <>&#8722; &#8377; {expense.toFixed(2)}</>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
