import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { login, logout, signup } from "../api/auth";
import { toast } from "react-toastify";

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/validate", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Not authenticated");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        toast.error("Session expired. Please log in again.");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const data = await signup(name, email, password);

      if (data) {
        setUser(data);
        toast.success("Signup successful.");
        navigate("/home");
      } else {
        throw new Error("User details not found in response");
      }
    } catch (error: any) {
      const errorMessage = error.message || "Signup failed";
      toast.error(errorMessage);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const data = await login(email, password);

      if (data) {
        setUser(data);
        toast.success("Login successful.");
        navigate("/home");
      } else {
        throw new Error("User details not found in response");
      }
    } catch (error: any) {
      const errorMessage = error.message || "Login failed";
      toast.error(errorMessage);
    }
  };

  const signOut = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/auth");
    } catch (error: any) {
      const errorMessage = error.message || "Logout failed.";
      toast.error(errorMessage);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
