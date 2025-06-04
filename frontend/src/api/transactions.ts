import api from './axios';
import type { Transaction, NewTransaction } from '../types';

export const fetchTransactions = async (period?: string): Promise<Transaction[]> => {
  const url = period ? `/transactions?period=${period}` : '/transactions';
  const res = await api.get(url);
  return res.data.transactions;
};

export const fetchPaginatedTransactions = async (
  limit: number,
  offset: number,
): Promise<Transaction[]> => {
  const res = await api.get(`/transactions?limit=${limit}&offset=${offset}`);
  return res.data.transactions;
};

export const createTransaction = async (data: NewTransaction): Promise<Transaction> => {
  const res = await api.post('/transactions', data);
  return res.data.transaction;
};
