import { Category } from '../types';

export const incomeCategories: Category[] = [
  { id: 1, name: 'Salary', type: 'income', color: '#34D399' },
  { id: 2, name: 'Freelance', type: 'income', color: '#10B981' },
  { id: 3, name: 'Investment', type: 'income', color: '#059669' },
  { id: 4, name: 'Business', type: 'income', color: '#047857' },
  { id: 5, name: 'Others', type: 'income', color: '#064E3B' },
];

export const expenseCategories: Category[] = [
  { id: 6, name: 'Food', type: 'expense', color: '#D64933' }, // Tomato Clay
  { id: 7, name: 'Transport', type: 'expense', color: '#C0392B' }, // Soft Crimson
  { id: 8, name: 'Rent', type: 'expense', color: '#B22222' }, // Firebrick Red
  { id: 9, name: 'Utilities', type: 'expense', color: '#A93226' }, // Muted Rosewood
  { id: 10, name: 'Health', type: 'expense', color: '#992222' }, // Warm Rust Red
  { id: 11, name: 'Miscellaneous', type: 'expense', color: '#872121' }, // Deep Coral Red
];
