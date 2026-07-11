import { createContext, useState, useEffect, type ReactNode } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummeryApi";
import type { Product } from "../types/product.types";
interface UserType {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
}

interface Order {
  _id: string;
  purchase_order_id: string;
  purchase_order_name: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  createdAt: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface AuthContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
  loading: boolean;
  logout: () => void;

  orders: Order[];
  fetchOrders: () => Promise<void>;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;

  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  fetchProducts: () => Promise<void>;

  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
  isAuthenticated: false,
  loading: true,
  setIsAuthenticated: () => {},

  orders: [],
  fetchOrders: async () => {},
  setOrders: () => {},

  products: [],
  setProducts: () => {},
  fetchProducts: async () => {},

  selectedProduct: null,
  setSelectedProduct: () => {},

  cart: [],
  setCart: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

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

  const fetchOrders = async () => {
    try {
      const response = await Axios(SummaryApi.orders);

      if (response.status === 200) {
        setOrders(response.data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await Axios(SummaryApi.products);

      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
      fetchProducts();
    }
  }, [isAuthenticated, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        isAuthenticated,
        setIsAuthenticated,
        loading,
        orders,
        setOrders,
        fetchOrders,
        selectedProduct,
        setSelectedProduct,
        products,
        setProducts,
        fetchProducts,
        cart,
        setCart,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
