import { User } from '../types';
import { clearUser } from '../utils/storage';
import api from './axios';

export const login = async (data: { email: string; password: string }): Promise<User> => {
  const res = await api.post<User>('/auth/login', data);
  return res.data;
};

export const signup = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<User> => {
  const res = await api.post<User>('/auth/signup', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
  clearUser();
};

export const validateSession = async (): Promise<User> => {
  const res = await api.get<User>('/auth/validate');
  return res.data;
};
