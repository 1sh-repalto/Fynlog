import { User } from '../types';

export const saveUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = (): User | null => {
  const stored = localStorage.getItem('user');
  return stored ? JSON.parse(stored) : null;
};

export const clearUser = () => localStorage.removeItem('user');
