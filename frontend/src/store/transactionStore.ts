import { create } from "zustand";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../utils/fetchWithAuth";

export interface Transaction {
  id: number;
  userId: number;
  amount: number;
  categoryId: number;
  type: "income" | "expense";
  date: Date;
  description?: string;
}

interface TransactionStore {
  transactions: Transaction[];
  loading: boolean;
  selectedMonth: string;
  paginatedTransactions: Transaction[];
  limit: number;
  offset: number;
  hasMore: boolean;
  setSelectedMonth: (month: string) => void;
  fetchTransactions: (selectedMonth: String) => Promise<void>;
  fetchInitialPaginatedTransactions: () => Promise<void>;
  fetchMorePaginatedTransactions: () => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, "id">) => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  categories: [],
  loading: false,
  selectedMonth: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
  paginatedTransactions: [],
  limit: 10,
  offset: 0,
  hasMore: true,

  setSelectedMonth: (month) => set({ selectedMonth: month }),

  fetchTransactions: async (selectedMonth: String) => {
    set({ loading: true });
    try {
      let url = "http://localhost:3000/transaction";
      if (selectedMonth) {
        url += `?period=${selectedMonth}`;
      }

      const response = await fetchWithAuth(url, {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to fetch transactions.");
      const data = await response.json();

      set({ transactions: data.transactions });
    } finally {
      set({ loading: false });
    }
  },

  fetchInitialPaginatedTransactions: async () => {
    set({ loading: true, offset: 0, hasMore: true });
    try {
      const { limit } = get();
      const url = `http://localhost:3000/transaction?limit=${limit}&offset=0`;
      
      const response = await fetchWithAuth(url, { method: "GET" });
      if(!response.ok) throw new Error("Failed to fetch transactions.");
      const data = await response.json();

      set({
        paginatedTransactions: data.transactions,
        offset: limit,
        hasMore: data.transactions.length === limit,
      });
    } catch (error: any) {
      toast.error(error.message || "Error loading transactions");
    } finally {
      set({ loading: false });
    }
  },

  fetchMorePaginatedTransactions: async () => {
    const { offset, limit, hasMore, paginatedTransactions } = get();
    if(!hasMore) return;

    set({ loading: true });

    try {
      const url = `http://localhost:3000/transaction?limit=${limit}&offset=${offset}`;
      const response = await fetchWithAuth(url, { method: "GET" });
      if(!response.ok) throw new Error("Failed to fetch transactions.");

      const data = await response.json();

      set({
        paginatedTransactions: [...paginatedTransactions, ...data.transactions],
        offset: offset + limit,
        hasMore: data.transactions.length === limit,
      });

    } catch (error: any) {
      toast.error(error.message || "Error loading transactions.");
    } finally {
      set({ loading: false });
    }
  },

  addTransaction: async (transaction) => {
    set({ loading: true });
    try {
      const response = await fetchWithAuth(
        "http://localhost:3000/transaction",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transaction),
        }
      );

      if (!response.ok) throw new Error("Failed to add transaction.");
      const newTransaction = await response.json();

      set((state) => ({
        transactions: [newTransaction, ...state.transactions],
      }));

      const selectedMonth = get().selectedMonth;
      await get().fetchTransactions(selectedMonth);

      toast.success("Transaction added successfully");
    } catch (error: any) {
      toast.error(error.message || "Error adding transaction");
    } finally {
      set({ loading: false });
    }
  },
}));
