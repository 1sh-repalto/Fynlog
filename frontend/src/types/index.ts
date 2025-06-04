export interface Category {
  id: number;
  name: string;
  color: string;
  type: 'income' | 'expense';
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
}

export type NewTransaction = Omit<Transaction, 'id'>;
