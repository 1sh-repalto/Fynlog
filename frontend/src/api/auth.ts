const API_BASE_URL = "http://localhost:3000/auth";

interface User {
  id: number;
  email: string;
  name: string;
}

const fetchWrapper = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong.");
    }

    return response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unknown error occurred."
    );
  }
};

// signup
export const signup = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  return fetchWrapper(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
};

// login
export const login = async (email: string, password: string): Promise<User> => {
  return fetchWrapper(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
};

// logout
export const logout = async (): Promise<{ message: string }> => {
  return fetchWrapper(`${API_BASE_URL}/logout`, {
    method: "POST",
  });
};
