import { Category } from '../types';

// categories.ts
export const incomeCategories: Category[] = [
  { id: 1, name: 'Salary', type: 'income', color: '#B5EAD7', emoji: '💵' },
  { id: 2, name: 'Freelance', type: 'income', color: '#AEC6CF', emoji: '🧑‍💻' },
  { id: 3, name: 'Investment', type: 'income', color: '#C3B1E1', emoji: '📈' },
  { id: 4, name: 'Business', type: 'income', color: '#E2F0CB', emoji: '🏢' },
  { id: 5, name: 'Others', type: 'income', color: '#FFD8B1', emoji: '💰' },
];

export const expenseCategories: Category[] = [
  { id: 6, name: 'Food', type: 'expense', color: '#FFDAC1', emoji: '🍽️' },
  { id: 7, name: 'Transport', type: 'expense', color: '#A5D8FF', emoji: '🚌' },
  { id: 8, name: 'Rent', type: 'expense', color: '#D6CDEA', emoji: '🏠' },
  { id: 9, name: 'Utilities', type: 'expense', color: '#F7F1BA', emoji: '💡' },
  { id: 10, name: 'Health', type: 'expense', color: '#C9E4DE', emoji: '❤️‍🩹' },
  { id: 11, name: 'Miscellaneous', type: 'expense', color: '#EAD5DC', emoji: '📦' },
];

