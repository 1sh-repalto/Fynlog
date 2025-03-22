const API_BASE_URL = "http://localhost:3000/auth";

// signup
export const signup = async (
  name: string,
  email: string,
  password: string
): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("signup failed");
  }

  return await response.json();
};

// login
export const login = async (email: string, password: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// logout
export const logout = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Logout failed");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
