import { create } from "zustand";
import { toast } from "react-toastify";

export interface Transaction {
  id: number;
  userId: number;
  amount: number;
  categoryId: number;
  type: "income" | "expense";
  date: Date;
  description?: string;
}

export interface Category {
  id: number;
  userId: number;
  name: string;
  isDefault: boolean;
}

interface TransactionStore {
  transactions: Transaction[];
  categories: Category[];
  loading: boolean;
  fetchTransactions: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, "id">) => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  categories: [],
  loading: true,

  fetchTransactions: async () => {
    set({ loading: true });
    try {
      const response = await fetch("http://localhost:3000/transaction", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch transactions.");
      const data = await response.json();

      set({ transactions: data });
    } catch (error: any) {
      toast.error(error.message || "Error fetching transactions");
    } finally {
      set({ loading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const response = await fetch("http://localhost:3000/category", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to get categories.");
      const data = await response.json();

      set({ categories: data });
    } catch (error: any) {
      toast.error(error.message || "Error fetching categories.");
    }
  },

  addTransaction: async (transaction) => {
    try {
      const response = await fetch("http://localhost:3000/transaction", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) throw new Error("Failed to add transaction.");
      const newTransaction = await response.json();

      set((state) => ({
        transactions: [...state.transactions, newTransaction],
      }));
      toast.success("Transaction added successfully");
    } catch (error: any) {
      toast.error(error.message || "Error adding transaction");
    }
  },
}));
