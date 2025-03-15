const API_BASE_URL = "http://localhost:3000/auth";

// signup
export const signup = async (name: string, email: string, password: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    });

    if(!response.ok) {
        throw new Error("signup failed");
    }

    const data = await response.json();
    return data;
}

// login
export const login = async (email: string, password: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include"
    });
    
    if(!response.ok) {
        throw new Error("Login failed");
    }

    const data = await response.json();
    
    return data;
};

// logout 
export const logout = async (): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
    });

    if(!response.ok) {
        throw new Error("Logout failed");
    }

    const data = await response.json();
    return data;
}