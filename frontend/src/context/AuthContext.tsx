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
  isAuthenticated: boolean;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

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
        if (JSON.stringify(user) !== JSON.stringify(userData)) {
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        }
      } catch (error) {
        if (storedUser) {
          toast.error("Session expired. Please log in again.");
        }
        setUser(null);
        localStorage.removeItem("user");
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
        if (JSON.stringify(user) !== JSON.stringify(data)) {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        }
        toast.success("Signup successful.");
        navigate("/home");
      } else {
        throw new Error("User details not found in response");
      }
    } catch (error: any) {
      toast.error(
        `Signup failed: ${error.message || "Unknown error occurred"}`
      );
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const data = await login(email, password);

      if (data) {
        if (JSON.stringify(user) !== JSON.stringify(data)) {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        }
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
      localStorage.removeItem("user");
      navigate("/auth");
    } catch (error: any) {
      const errorMessage = error.message || "Logout failed.";
      toast.error(errorMessage);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, signIn, signUp, signOut }}
    >
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      ) : (
        children
      )}
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
