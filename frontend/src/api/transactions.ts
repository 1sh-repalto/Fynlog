import api from './axios';
import { Transaction, NewTransaction } from '../types';

export const createTransaction = async (transaction: NewTransaction): Promise<Transaction> => {  
  const res = await api.post<{ transaction: Transaction }>('/transactions', transaction);
  return res.data.transaction;
};

export const fetchAllTransactions = async (): Promise<Transaction[]> => {
  const res = await api.get<{transactions: Transaction[]}>('/transactions/all');
  return res.data.transactions;
};

export const fetchMonthlyTransactions = async (month: string): Promise<Transaction[]> => {
  const res = await api.get<{transactions: Transaction[]}>(`/transactions/monthly?month=${month}`);
  return res.data.transactions;
}

export const fetchPaginatedTransactions = async (limit: number, offset: number): Promise<Transaction[]> => {
  const res = await api.get<{transactions: Transaction[]}>(`/transactions/paginated?limit=${limit}&offset=${offset}`);
  return res.data.transactions;
}

export const deleteTransaction = async (id: number) => {
  await api.delete(`/transactions/${id}`);
};