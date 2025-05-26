import { Link } from "react-router-dom";
import { expenseCategories, incomeCategories } from "../data/defautCategories";
import { Transaction, useTransactionStore } from "../store/transactionStore";
import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import SeeTransactionModal from "./SeeTransactionModal";

const DashboardRecentTransactions = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const loading = useTransactionStore((state) => state.loading);
  const fetchTransactions = useTransactionStore(
    (state) => state.fetchTransactions
  );
  const selectedMonth = useTransactionStore((state) => state.selectedMonth);

  const recent3transactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (tx: Transaction) => {
    setSelectedTransaction(tx);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchTransactions(selectedMonth);
  }, [fetchTransactions, selectedMonth]);

  return (
    <div className="md:w-13/20 md:ml-2 w-full h-109 p-3 bg-lighterDark rounded-md">
      <h1 className="text-xl  text-neutral-500 font-semibold ml-2">
        Recent Transactions
      </h1>
      <ul className="mt-4 space-y-3">
        {loading ? (
          <div className="flex justify-center items-center mt-40">
            <Loader2 className="animate-spin text-neutral-400" size={50} />
          </div>
        ) : recent3transactions.length === 0 ? (
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
                onClick={() => openModal(tx)}
                className="h-24 px-8 flex justify-between items-center bg-lightDark p-3 rounded-md hover:scale-102 cursor-pointer transition-transform duration-200 transform"
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
        <SeeTransactionModal
          isOpen={isModalOpen}
          onClose={closeModal}
          transaction={selectedTransaction}
        />
      </ul>
      {!loading && recent3transactions.length !== 0 && (
        <div className="flex justify-center">
          <Link to={"/transactions"}>
            <button className="bg-lightDark hover:bg-dark active:bg-lightDark h-auto mt-3 py-2 px-15 rounded-md font-semibold text-lg cursor-pointer flex items-center gap-2 transition-transform duration-200 transform hover:scale-105">
              See all
              <ArrowRight size={22} />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardRecentTransactions;
