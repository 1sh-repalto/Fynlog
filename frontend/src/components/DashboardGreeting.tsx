import { useEffect } from "react";
import { useTransactionStore } from "../store/transactionStore";
import { useAuthStore } from "../store/useAuth";

const DashboardGreeting = () => {
  const { user } = useAuthStore();
  if (!user) {
    return <h1>No user detected</h1>;
  }

  const { fetchTransactions, selectedMonth, setSelectedMonth } =
    useTransactionStore();

  const recentMonths = Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return {
      value: `${date.getFullYear()}-${date.getMonth() + 1}`,
      label: `${date.toLocaleString("default", {
        month: "long",
      })}, ${date.getFullYear()}`,
    };
  });

  useEffect(() => {
    if (selectedMonth) {
      fetchTransactions(selectedMonth);
    }
  }, [selectedMonth]);

  return (
    <>
      <h1 className="text-neutral text-5xl font-bold mt-10">
        Hello, {`${user.name}`}
      </h1>
      <div className="md:flex md:items-baseline md:gap-2 mt-2">
        <p className="text-neutral text-md italic">
          Here's your financial summary for{" "}
        </p>
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
