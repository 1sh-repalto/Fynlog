import { create } from "zustand";
import { Budget } from "../types";
import api from "../api/axios";

type BudgetStore = {
    budgets: Budget[];
    fetchBudgets: () => Promise<void>;
    addBudgets: (categoryId: number, amount: number) => Promise<void>;
    deleteBudget: (id: number) => Promise<void>;
}

export const useBudgetStore = create<BudgetStore>((set) => ({
    budgets: [],
    fetchBudgets: async () => {
        const res = await api.get("/budgets");
        set({ budgets: res.data })
    },
    addBudgets: async (categoryId, amount) => {
        await api.post("/budgets", { categoryId, amount });
        await useBudgetStore.getState().fetchBudgets();
    },
    deleteBudget: async (id) => {
    await api.delete(`/budgets/${id}`);
    set((state) => ({
      budgets: state.budgets.filter((b) => b.id !== id),
    }));
  },
}));