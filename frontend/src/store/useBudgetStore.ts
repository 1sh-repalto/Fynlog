import { create } from "zustand";
import { Budget } from "../types";
import {
  fetchBudgets as fetchBudgetsApi,
  addBudget as addBudgetApi,
  deleteBudget as deleteBudgetApi,
} from "../api/budget";
import { toast } from "react-toastify";
import { toastApiCall } from "../utils/handleApiErrors";

type BudgetStore = {
  budgets: Budget[];
  fetchBudgets: () => Promise<void>;
  addBudget: (categoryId: number, amount: number) => Promise<void>;
  deleteBudget: (id: number) => Promise<void>;
};

export const useBudgetStore = create<BudgetStore>((set) => ({
  budgets: [],

  fetchBudgets: async () => {
    const data = await toastApiCall(
      fetchBudgetsApi(),
      "Failed to fetch budgets"
    );
    if (data) {
      set({ budgets: data });
    }
  },

  addBudget: async (categoryId, amount) => {
    const result = await toastApiCall(
      addBudgetApi(categoryId, amount),
      "Failed to add budget"
    );
    if (result !== null) {
      toast.success("Budget added successfully");
      await useBudgetStore.getState().fetchBudgets();
    }
  },

  deleteBudget: async (id) => {
    const result = await toastApiCall(
      deleteBudgetApi(id),
      "Failed to delete budget"
    );
    if (result !== null) {
      toast.success("Budget deleted successfully");
      set((state) => ({
        budgets: state.budgets.filter((b) => b.id !== id),
      }));
    }
  },
}));
