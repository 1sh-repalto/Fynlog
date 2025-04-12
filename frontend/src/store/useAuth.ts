import { create } from "zustand";
import { login, logout, signup } from "../api/auth";
import { toast } from "react-toastify";

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthStore {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  initialize: () => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  isAuthenticated: false,

  initialize: async () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      set({ user: JSON.parse(storedUser), isAuthenticated: true });
    }

    try {
      const response = await fetch("http://localhost:3000/auth/validate", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Not Authenticated");

      const userData = await response.json();

      if (!userData) {
        set({ user: null, isAuthenticated: false });
        return;
      }
      
      set({
        user: userData,
        isAuthenticated: true,
      });
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      if (storedUser) {
        toast.error("Session expired. Please log in again.");
      }
      set({ user: null, isAuthenticated: false });
      localStorage.removeItem("user");
    } finally {
      set({ loading: false });
    }
  },

  signUp: async (name, email, password) => {
    try {
      const data = await signup(name, email, password);
      if (!data) throw new Error("User details not fund in response");

      set({ user: data, isAuthenticated: true, loading: false });
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Signup successful.");
    } catch (error: any) {
      toast.error(
        `Signup failed: ${error.message || "Unknown error occurred"}`
      );
    }
  },

  signIn: async (email, password) => {
    try {
      const data = await login(email, password);
      if (!data) throw new Error("User details not found in response");

      set({ user: data, isAuthenticated: true, loading: false });
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Login successful.");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    }
  },

  signOut: async () => {
    try {
      await logout();
      set({ user: null, isAuthenticated: false, loading: false });
      localStorage.removeItem("user");
      toast.success("Logout successful.");
    } catch (error: any) {
      toast.error(error.message || "Logout failed");
    }
  },
}));
