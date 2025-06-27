import { create } from 'zustand';
import type { Transaction, NewTransaction } from '../types';
import {
  createTransaction,
  fetchAllTransactions,
  fetchPaginatedTransactions,
  deleteTransaction as deleteTransactionApi,
} from '../api/transactions';
import { toast } from 'react-toastify';
import { toastApiCall } from '../utils/handleApiErrors';

interface TransactionStore {
  transactions: Transaction[];
  paginatedTransactions: Transaction[];
  loading: boolean;
  hasMore: boolean;
  limit: number;
  offset: number;
  selectedMonth: string;

  fetchAll: () => Promise<void>;
  fetchInitialPaginated: () => Promise<void>;
  fetchMorePaginated: () => Promise<void>;
  addTransaction: (transaction: NewTransaction) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
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
    const transactions = await toastApiCall(
      fetchAllTransactions(),
      'Failed to fetch all transactions',
    );
    if (transactions) set({ transactions });
    set({ loading: false });
  },

  fetchInitialPaginated: async () => {
    set({ loading: true, offset: 0, hasMore: true });
    const { limit } = get();
    const transactions = await toastApiCall(
      fetchPaginatedTransactions(limit, 0),
      'Failed to load initial transactions',
    );
    if (transactions) {
      set({
        paginatedTransactions: transactions,
        offset: limit,
        hasMore: transactions.length === limit,
      });
    }
    set({ loading: false });
  },

  fetchMorePaginated: async () => {
    const { offset, limit, paginatedTransactions, hasMore } = get();
    if (!hasMore) return;
    set({ loading: true });

    const newTransactions = await toastApiCall(
      fetchPaginatedTransactions(limit, offset),
      'Failed to load more transactions',
    );

    if (newTransactions) {
      set({
        paginatedTransactions: [...paginatedTransactions, ...newTransactions],
        offset: offset + limit,
        hasMore: newTransactions.length === limit,
      });
    }
    set({ loading: false });
  },

  addTransaction: async (transaction: NewTransaction) => {
    set({ loading: true });
    const created = await toastApiCall(
      createTransaction(transaction),
      'Failed to create transaction',
    );

    if (created) {
      set((state) => ({
        transactions: [created, ...state.transactions],
        paginatedTransactions: [created, ...state.paginatedTransactions],
      }));
      toast.success('Transaction added');
    }
    set({ loading: false });
  },

  deleteTransaction: async (id: number) => {
    try {
      await deleteTransactionApi(id);
      set((state) => {
        const updatedTransactions = state.transactions.filter((t) => t.id !== id);
        const updatedPaginated = state.paginatedTransactions.filter((t) => t.id !== id);
        return {
          transactions: updatedTransactions,
          paginatedTransactions: updatedPaginated,
        };
      });
      toast.success('Transaction deleted');
    } catch (err) {
      toast.error('Failed to delete transaction');
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
    });
  },
}));
