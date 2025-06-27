import { create } from 'zustand';
import { login, signup, logout, validateSession } from '../api/auth';
import { User } from '../types';
import { clearUser, getUser, saveUser } from '../utils/storage';
import api from '../api/axios';
import { toastApiCall } from '../utils/handleApiErrors';

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
  isAuthenticated: !!getUser(),

  initializeAuth: async () => {
    set({ loading: true });

    const sessionStatus = await toastApiCall(
      api.get('/auth/session-status').then(res => res.data),
      'Failed to check session status'
    );

    if (!sessionStatus?.hasSession) {
      clearUser();
      set({ user: null, isAuthenticated: false, loading: false });
      return;
    }

    let user = await toastApiCall(validateSession(), 'Session validation failed');

    if (!user) {
      const refreshed = await toastApiCall(api.post('/auth/refresh'), 'Session refresh failed');

      if (refreshed) {
        user = await toastApiCall(validateSession(), 'Session re-validation failed');
      }
    }

    if (user) {
      saveUser(user);
      set({ user, isAuthenticated: true });
    } else {
      clearUser();
      set({ user: null, isAuthenticated: false });
    }

    set({ loading: false });
  },

  loginUser: async (data) => {
    const user = await toastApiCall(login(data), 'Login failed');
    if (user) {
      saveUser(user);
      set({ user, isAuthenticated: true });
    }
  },

  signupUser: async (data) => {
    const user = await toastApiCall(signup(data), 'Signup failed');
    if (user) {
      saveUser(user);
      set({ user, isAuthenticated: true });
    }
  },

  logoutUser: async () => {
    await toastApiCall(logout(), 'Logout failed');
    clearUser();
    set({ user: null, isAuthenticated: false });
  },
}));
