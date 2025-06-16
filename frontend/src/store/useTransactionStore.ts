import { create } from 'zustand';
import { toast } from 'react-toastify';
import type { Transaction, NewTransaction } from '../types';
import {
  createTransaction,
  fetchAllTransactions,
  fetchPaginatedTransactions
} from '../api/transactions';

interface TransactionStore {
  transactions: Transaction[];
  paginatedTransactions: Transaction[];
  loading: boolean;
  hasMore: boolean;
  limit: number;
  offset: number;
  selectedMonth: string;

  fetchAll: () => Promise<void>;
  // fetchByMonth: (month: string) => Promise<void>
  fetchInitialPaginated: () => Promise<void>;
  fetchMorePaginated: () => Promise<void>;
  addTransaction: (transaction: NewTransaction) => Promise<void>;
  setSelectedMonth: (month: string) => void;
  reset: () => void;
}

const getDefaultMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};


export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  paginatedTransactions: [],
  loading: false,
  hasMore: true,
  limit: 10,
  offset: 0,
  selectedMonth: getDefaultMonth(),

  fetchAll: async () => {
    set({ loading: true });
    try {
      const transactions = await fetchAllTransactions();
      set({ transactions });
    } catch (error) {
      toast.error("Failed to fetch all transactions")
    } finally {
      set({ loading: false })
    }
  },

  // fetchByMonth: async (month: string) => {
  //   set({ loading: true });
  //   try {
  //     const transactions = await fetchMonthlyTransactions(month);
  //     set({ transactions });
  //   } catch (error) {
  //     toast.error("Failed to fetch monthly transactions.");
  //   } finally {
  //     set({ loading: false });
  //   }
  // },

  fetchInitialPaginated: async () => {
    set({ loading: true, offset: 0, hasMore: true });
    try {
      const { limit } = get();
      const transactions = await fetchPaginatedTransactions(limit, 0);
      set({
        paginatedTransactions: transactions,
        offset: limit,
        hasMore: transactions.length === limit,
      });
    } catch (error) {
      toast.error("Failed to load initial transactions");
    } finally {
      set({ loading: false });
    }
  },

  fetchMorePaginated: async () => {
    const { offset, limit, paginatedTransactions, hasMore } = get();
    if(!hasMore) return;
    set({ loading: true });

    try {
      const newTransactions = await fetchPaginatedTransactions(limit, offset);
      set({
        paginatedTransactions: [...paginatedTransactions, ...newTransactions],
        offset: offset + limit,
        hasMore: newTransactions.length === limit,
      });
    } catch (error) {
      toast.error("Failed to load more paginated transactions");
    } finally {
      set({ loading: false});
    }
  },

  addTransaction: async (transaction: NewTransaction) => {
    set({ loading: true });
    try {      
      const created = await createTransaction(transaction);
      set((state) => ({
        transactions: [created, ...state.transactions],
        paginatedTransactions: [created, ...state.paginatedTransactions],
      }));
      toast.success("Transaction added");
    } catch (error) {
      toast.error("Failed to create transaction");
    } finally {
      set({ loading: false });
    }
  },

  setSelectedMonth: (month: string) => set({ selectedMonth: month }),

  reset: () => {
    set({
      transactions: [],
      paginatedTransactions: [],
      loading: false,
      hasMore: false,
      offset: 0,
      selectedMonth: getDefaultMonth(),
    })
  }
}));
