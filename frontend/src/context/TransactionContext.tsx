import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  startTransition,
} from "react";
import { toast } from "react-toastify";

interface Transaction {
  id: number;
  userId: number;
  amount: number;
  categoryId: number;
  type: "income" | "expense";
  date: Date;
  description?: string;
}

interface Category {
  id: number;
  userId: number;
  name: string;
  isDefault: boolean;
}

interface TransactionContextType {
  transactions: Transaction[];
  categories: Category[];
  loading: boolean;
  fetchTransactions: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, "id">) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:3000/transaction", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch transactions.");

      const data = await response.json();
      setTransactions(data);
    } catch (error: any) {
      toast.error(error.message || "Error fetching transactions");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/category", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to get categories.");
      }

      const data = await response.json();
      setCategories(data);
    } catch (error: any) {
      toast.error(error.message || "Error fetching categories.");
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, "id">) => {
    try {
      const response = await fetch("http://localhost:3000/transaction", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        throw new Error("Failed to add transaction.");
      }

      const newTransaction = await response.json();
      setTransactions((prev) => [...prev, newTransaction]);
      toast.success("Transaction added successfully");
    } catch (error: any) {
      toast.error(error.message || "Error adding transaction");
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        categories,
        loading,
        fetchTransactions,
        fetchCategories,
        addTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider"
    );
  }
  return context;
};
