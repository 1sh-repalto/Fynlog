import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Transaction, useTransactionStore } from "../store/transactionStore";
import { expenseCategories, incomeCategories } from "../data/defautCategories";
import { ArrowDown } from "lucide-react";
import SeeTransactionModal from "../components/SeeTransactionModal";

const TransactionsPage = () => {
  const {
    paginatedTransactions,
    fetchInitialPaginatedTransactions,
    fetchMorePaginatedTransactions,
    hasMore,
    loading,
  } = useTransactionStore();

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
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
    fetchInitialPaginatedTransactions();
  }, [fetchInitialPaginatedTransactions]);

  return (
    <>
      <Navbar />
      <main className="pt-7 px-12">
        <h2 className="text-neutral text-5xl font-bold mt-10">
          Your Transactions
        </h2>

        <div className="bg-lightDark p-5 mt-10 rounded-md">
          <ul className="space-y-5">
            {paginatedTransactions.map((txn) => {
              const amount = Number(txn.amount);
              const date = new Date(txn.date);
              const allCategories = [...expenseCategories, ...incomeCategories];
              const category = allCategories.find(
                (cat) => cat.id === txn.categoryId
              );
              return (
                <li
                  key={txn.id}
                  onClick={() => openModal(txn)}
                  className="h-24 px-8 flex justify-between items-center bg-lighterDark p-3 rounded-md hover:scale-102 cursor-pointer transition-transform duration-200 transform"
                >
                  <div className="h-full flex flex-col justify-center">
                    <p className="text-neutral font-semibold text-xl">
                      {category?.name || "No Category"}
                    </p>
                    <p className="text-lg text-neutral-500 font-semibold">
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
                    className={`text-2xl font-semibold ${
                      txn.type === "income" ? "text-secondary" : "text-rose-700"
                    }`}
                  >
                    {txn.type === "income" ? "+ " : "- "}₹
                    {isNaN(amount) ? "0.00" : amount.toFixed(2)}
                  </div>
                </li>
              );
            })}
          </ul>
          <SeeTransactionModal
            isOpen={isModalOpen}
            onClose={closeModal}
            transaction={selectedTransaction}
          />
        </div>

        {hasMore && !loading && (
            <div className="flex justify-center text-center my-6">
              <button
                className="bg-lighterDark hover:bg-lighterDark active:bg-lightDark h-auto mt-3 py-2 px-15 rounded-md font-semibold text-lg cursor-pointer flex items-center gap-2 transition-transform duration-200 transform hover:scale-105"
                onClick={fetchMorePaginatedTransactions}
              >
                Load More
                <ArrowDown size={22} />
              </button>
            </div>
          )}

        {/* Loading State */}
        {loading && (
          <p className="mt-4 text-center text-md text-gray-500">Loading...</p>
        )}

        {/* No More Transactions */}
        {!hasMore && !loading && paginatedTransactions.length > 0 && (
          <p className="my-4 text-center text-lg text-gray-400">
            No more transactions
          </p>
        )}
      </main>
    </>
  );
};

export default TransactionsPage;
