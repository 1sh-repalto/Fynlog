import { create } from 'zustand';
import { toast } from 'react-toastify';
import type { Transaction, NewTransaction } from '../types';
import {
  fetchTransactions,
  fetchPaginatedTransactions,
  createTransaction,
} from '../api/transactions';

interface TransactionStore {
  transactions: Transaction[];
  loading: boolean;
  selectedMonth: string;
  paginatedTransactions: Transaction[];
  limit: number;
  offset: number;
  hasMore: boolean;
  setSelectedMonth: (month: string) => void;
  fetchTransactions: (selectedMonth: string) => Promise<void>;
  fetchInitialPaginatedTransactions: () => Promise<void>;
  fetchMorePaginatedTransactions: () => Promise<void>;
  addTransaction: (transaction: NewTransaction) => Promise<void>;
  reset: () => void;
}

const getDefaultMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}`;
};

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  loading: false,
  selectedMonth: getDefaultMonth(),
  paginatedTransactions: [],
  limit: 10,
  offset: 0,
  hasMore: true,

  setSelectedMonth: (month) => set({ selectedMonth: month }),

  fetchTransactions: async (selectedMonth: string) => {
    set({ loading: true });
    try {
      const data = await fetchTransactions(selectedMonth);

      set({ transactions: data });
    } catch (error) {
      if (error && typeof error === 'object' && 'message' in error) {
        toast.error((error as { message?: string }).message || 'Failed to fetch transactions');
      } else {
        toast.error('Failed to fetch transactions');
      }
    } finally {
      set({ loading: false });
    }
  },

  fetchInitialPaginatedTransactions: async () => {
    set({ loading: true, offset: 0, hasMore: true });
    try {
      const { limit } = get();
      const data = await fetchPaginatedTransactions(limit, 0);
      set({
        paginatedTransactions: data,
        offset: limit,
        hasMore: data.length === limit,
      });
    } catch (error) {
      if (error && typeof error === 'object' && 'message' in error) {
        toast.error((error as { message?: string }).message || 'Failed to fetch transactions');
      } else {
        toast.error('Error loading transactions');
      }
    } finally {
      set({ loading: false });
    }
  },

  fetchMorePaginatedTransactions: async () => {
    const { offset, limit, hasMore, paginatedTransactions } = get();
    if (!hasMore) return;
    set({ loading: true });
    try {
      const data = await fetchPaginatedTransactions(limit, offset);
      set({
        paginatedTransactions: [...paginatedTransactions, ...data],
        offset: offset + limit,
        hasMore: data.length === limit,
      });
    } catch (error) {
      if (error && typeof error === 'object' && 'message' in error) {
        toast.error((error as { message?: string }).message || 'Failed to fetch transactions');
      } else {
        toast.error('Error loading transactions.');
      }
    } finally {
      set({ loading: false });
    }
  },

  addTransaction: async (transaction) => {
    set({ loading: true });
    try {
      const newTransaction = await createTransaction(transaction);
      set((state) => ({
        transactions: [newTransaction, ...state.transactions],
      }));
      toast.success('Transaction added successfully');
    } catch (error) {
      if (error && typeof error === 'object' && 'message' in error) {
        toast.error((error as { message?: string }).message || 'Failed to fetch transactions');
      } else {
        toast.error('Error adding transactions');
      }
    } finally {
      set({ loading: false });
    }
  },

  reset: () => {
    set({
      transactions: [],
      loading: false,
      selectedMonth: getDefaultMonth(),
      paginatedTransactions: [],
      limit: 10,
      offset: 0,
      hasMore: true,
    });
  },
}));
