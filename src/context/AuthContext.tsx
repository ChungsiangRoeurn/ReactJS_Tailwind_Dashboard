import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { authApi } from "../api/authApi";

type AuthContextType = {
  user: { token: string } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ token: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setUser({ token });
    }

    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const res = await authApi.login({ username, password });
    const token = res.data.token;

    localStorage.setItem("token", token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
