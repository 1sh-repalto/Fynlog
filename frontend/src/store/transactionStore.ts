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
  setSelectedMonth: (month: string) => void;
  fetchTransactions: (selectedMonth: String) => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, "id">) => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  categories: [],
  loading: true,
  selectedMonth: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,

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

      set({ transactions: data });
    } finally {
      set({ loading: false });
    }
  },

  addTransaction: async (transaction) => {
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
        transactions: [...state.transactions, newTransaction],
      }));
      toast.success("Transaction added successfully");
    } catch (error: any) {
      toast.error(error.message || "Error adding transaction");
    }
  },
}));
