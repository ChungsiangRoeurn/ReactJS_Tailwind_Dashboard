import React, { createContext, useState, useContext, ReactNode } from "react";
import { loginUser, registerUser } from "../api/auth-api";
import { LoginCredentials, RegisterCredentials, User } from "../types/auth";

interface AuthContextType {
  user: User | null;
  register: (data: RegisterCredentials) => Promise<void>;
  login: (data: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const register = async (data: RegisterCredentials) => {
    try {
      const res = await registerUser(data);
      setUser(res.user);
      localStorage.setItem("token", res.token);
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const login = async (data: LoginCredentials) => {
    try {
      const res = await loginUser(data);
      setUser(res.user);
      localStorage.setItem("token", res.token);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier usage
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
