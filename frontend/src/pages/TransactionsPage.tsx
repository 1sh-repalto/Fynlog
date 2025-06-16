import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { Transaction } from '../types';
import { useTransactionStore } from '../store/useTransactionStore';
import SeeTransactionModal from '../components/SeeTransactionModal';
import TransactionListItem from '../components/TransactionListItem';
import { getCategoryById } from '../utils/getCategoryById';
import Twemoji from 'react-twemoji';

const TransactionsPage = () => {
  const { paginatedTransactions, fetchInitialPaginated, fetchMorePaginated, hasMore, loading } =
    useTransactionStore();

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
    fetchInitialPaginated();
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-7 px-12">
        <div className='flex gap-4 items-center mt-10'>
          <h1 className="text-neutral text-5xl font-bold">Your Transactions</h1>
          <Twemoji options={{ className: '' }}>
            <span className="w-12 h-12 inline-block">📋</span>
          </Twemoji>
        </div>

        <div className="bg-lightDark p-5 mt-10 rounded-md">
          <ul className="space-y-5">
            {paginatedTransactions.map((txn) => {
              const category = getCategoryById(txn.categoryId);
              return (
                <TransactionListItem
                  key={txn.id}
                  transaction={txn}
                  category={category}
                  onClick={() => openModal(txn)}
                />
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
              onClick={fetchMorePaginated}
            >
              Load More
              <ArrowDown size={22} />
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && <p className="mt-4 text-center text-md text-gray-500">Loading...</p>}

        {/* No More Transactions */}
        {!hasMore && !loading && paginatedTransactions.length > 0 && (
          <p className="my-4 text-center text-lg text-gray-400">No more transactions</p>
        )}
      </main>
    </>
  );
};

export default TransactionsPage;
