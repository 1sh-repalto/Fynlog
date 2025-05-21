import { Link } from "react-router-dom";
import { expenseCategories, incomeCategories } from "../data/defautCategories";
import { useTransactionStore } from "../store/transactionStore";
import { ArrowRight } from "lucide-react";

const DashboardRecentTransactions = () => {
  const { transactions } = useTransactionStore();

  const recent3transactions = [...transactions];
  return (
    <div className="md:w-13/20 md:ml-2 w-full h-109 p-3 bg-lighterDark rounded-md">
      <h1 className="text-xl  text-neutral-500 font-semibold ml-2">
        Recent Transactions
      </h1>
      <ul className="mt-4 space-y-3">
        {recent3transactions.length === 0 ? (
          <p className="text-neutral-400 italic text-center font-semibold text-3xl mt-40">
            No recent transactions
          </p>
        ) : (
          recent3transactions.map((tx) => {
            const amount = Number(tx.amount);
            const date = new Date(tx.date);
            const allCategories = [...expenseCategories, ...incomeCategories];
            const category = allCategories.find(
              (cat) => cat.id === tx.categoryId
            );

            return (
              <li
                key={tx.id}
                className="h-24 px-5 flex justify-between items-center bg-lightDark p-3 rounded-md"
              >
                <div className="h-full flex flex-col justify-center">
                  <p className="text-neutral font-medium text-lg">
                    {category?.name || "No Category"}
                  </p>
                  <p className="text-md text-neutral-500 font-semibold">
                    {isNaN(date.getTime())
                      ? "Invalid date"
                      : date.toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                  </p>
                </div>
                <div
                  className={`text-xl font-semibold ${
                    tx.type === "income" ? "text-secondary" : "text-rose-700"
                  }`}
                >
                  {tx.type === "income" ? "+ " : "- "}₹
                  {isNaN(amount) ? "0.00" : amount.toFixed(2)}
                </div>
              </li>
            );
          })
        )}
      </ul>
      <div className="flex justify-center">
        <Link to={"/page2"}>
          <button className="bg-lightDark hover:bg-dark active:bg-lightDark h-auto mt-3 py-2 px-15 rounded-md font-semibold text-lg cursor-pointer flex items-center gap-2">
            See all
            <ArrowRight />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardRecentTransactions;
