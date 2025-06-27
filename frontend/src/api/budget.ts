import api from './axios';

export const fetchBudgets = async () => {
  const res = await api.get("/budgets");
  return res.data;
};

export const addBudget = async (categoryId: number, amount: number) => {
  await api.post("/budgets", { categoryId, amount });
};

export const deleteBudget = async (id: number) => {
  await api.delete(`/budgets/${id}`);
};
