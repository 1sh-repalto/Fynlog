import { Category } from '../types';
import { incomeCategories, expenseCategories } from '../data/defaultCategories';

export function getCategoryById(id: number): Category | undefined {
  return [...incomeCategories, ...expenseCategories].find((cat) => cat.id === id);
}
