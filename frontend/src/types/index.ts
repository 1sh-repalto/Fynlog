export interface Category {
  id: number;
  name: string;
  color: string;
  type: 'income' | 'expense';
  emoji: string;
}

export interface Transaction {
  id: number;
  amount: number;
  categoryId: number;
  date: string;
  description?: string;
  type: 'income' | 'expense';
}

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface Budget {
  id: number;
  userId: number;
  categoryId: number;
  amount: number;
  month: string;
  createdAt: string;
  updatedAt: string;
}

export type NewTransaction = Omit<Transaction, 'id'>;
