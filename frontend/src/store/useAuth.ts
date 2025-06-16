import { create } from 'zustand';
import { login, signup, logout, validateSession } from '../api/auth';
import { User } from '../types';
import { clearUser, getUser, saveUser } from '../utils/storage';
import api from '../api/axios';

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  loginUser: (data: { email: string; password: string }) => Promise<void>;
  signupUser: (data: { name: string; email: string; password: string }) => Promise<void>;
  logoutUser: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: getUser(),
  loading: true,
  isAuthenticated: false,

  initializeAuth: async () => {
    try {
      const { hasSession } = await api.get('/auth/session-status').then((res) => res.data);
      if (!hasSession) {
        // No session at all (no refresh token)
        clearUser();
        set({ user: null, isAuthenticated: false });
        return;
      }

      try {
        const user = await validateSession();
        saveUser(user);
        set({ user, isAuthenticated: true });
      } catch (err: any) {
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          try {
            await api.post('/auth/refresh');
            const user = await validateSession();
            saveUser(user);
            set({ user, isAuthenticated: true });
          } catch (refreshErr) {
            // Refresh also failed
            clearUser();
            set({ user: null, isAuthenticated: false });
            console.warn('Session expired. Please log in again.');
          }
        } else {
          // Unexpected error during validateSession
          console.error('Unexpected error during session validation:', err);
        }
      }
    } catch (outerErr) {
      // session-status check itself failed
      console.error('Failed to check session status:', outerErr);
      clearUser();
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ loading: false });
    }
  },

  loginUser: async (data) => {
    const user = await login(data);
    saveUser(user);
    set({ user, isAuthenticated: true });
  },

  signupUser: async (data) => {
    const user = await signup(data);
    saveUser(user);
    set({ user, isAuthenticated: true });
  },

  logoutUser: async () => {
    await logout();
    set({ user: null, isAuthenticated: false });
  },
}));
