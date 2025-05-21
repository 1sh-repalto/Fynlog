import { useTransactionStore } from "../store/transactionStore";

const DashboardCards = () => {
  const { transactions, selectedMonth } = useTransactionStore();

  const filteredTransactions = transactions?.filter((tx) => {
    if (!tx.date) return false;
    const txDate = new Date(tx.date);
    const [selectedYear, selectedMonthNum] = selectedMonth
      .split("-")
      .map(Number);

    return (
      txDate.getFullYear() === selectedYear &&
      txDate.getMonth() + 1 === selectedMonthNum
    );
  }) || [];

  const income = filteredTransactions.length
    ? transactions
        .filter((tx) => tx.type === "income")
        .reduce((sum, tx) => sum + Number(tx.amount || 0), 0)
    : 0;

  const expense = filteredTransactions.length
    ? transactions
        .filter((tx) => tx.type === "expense")
        .reduce((sum, tx) => sum + Number(tx.amount || 0), 0)
    : 0;

  const balance = income - expense;

  return (
    <div className="md:w-7/20 w-full flex-col space-y-2">
      <div className="w-full h-35 p-3 bg-lighterDark rounded-md">
        <h1 className="text-xl text-neutral-500 font-semibold ml-2">Income</h1>
        <p
          className={`text-4xl font-semibold text-center mt-5 tracking-wider ${
            income === 0 ? "text-neutral" : "text-secondary"
          }`}
        >
          {income === 0 ? (
            `\u20B9 0.00`
          ) : (
            <>&#43; &#8377; {income.toFixed(2)}</>
          )}
        </p>
      </div>

      <div className="w-full h-35 p-3 bg-lighterDark rounded-md">
        <h1 className="text-xl text-neutral-500 font-semibold ml-2">Expense</h1>
        <p
          className={`text-4xl font-semibold text-center mt-5 tracking-wider ${
            expense === 0 ? "text-neutral" : "text-rose-700"
          }`}
        >
          {expense === 0 ? (
            `\u20B9 0.00`
          ) : (
            <>&#8722; &#8377; {expense.toFixed(2)}</>
          )}
        </p>
      </div>

      <div className="w-full h-35 p-3 bg-lighterDark rounded-md">
        <h1 className="text-xl text-neutral-500 font-semibold ml-2">Balance</h1>
        <p
          className={`text-4xl font-semibold text-center mt-5 tracking-wider ${
            balance > 0
              ? "text-secondary"
              : balance < 0
              ? "text-rose-700"
              : "text-neutral"
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
  );
};

export default DashboardCards;
