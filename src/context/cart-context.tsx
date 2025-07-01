import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { CartItemProps } from "../types/cart";

interface CartContextType {
  cart: CartItemProps | null;
  addToCart: (item: CartItemProps) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItemProps | null>(null);

  useEffect(() => {
    const loadCart = async () => {
      const stored = await AsyncStorage.getItem("@food");
      if (stored) {
        setCart(JSON.parse(stored));
      }
    };
    loadCart();
  }, []);

  const addToCart = async (item: CartItemProps) => {
    await AsyncStorage.setItem("@food", JSON.stringify(item));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
