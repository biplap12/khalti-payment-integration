import { createContext, useState, useEffect, type ReactNode } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummeryApi";
import type { Product } from "../data/products";
interface UserType {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
  loading: boolean;
  logout: () => void;

  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
  isAuthenticated: false,
  loading: true,
  setIsAuthenticated: () => {},

  selectedProduct: null,
  setSelectedProduct: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);

  // Check session on refresh
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await Axios({ ...SummaryApi.me });

        if (response.data) {
          setUser(response.data);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err: unknown) {
        setUser(null);
        setIsAuthenticated(false);
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await Axios(SummaryApi.logout);
      setUser(null);
      setIsAuthenticated(false);
    } catch {
      console.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        isAuthenticated,
        setIsAuthenticated,
        loading,

        selectedProduct,
        setSelectedProduct,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
