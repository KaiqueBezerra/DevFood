import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { CartItemProps } from "../types/cart";

interface CartContextType {
  cart: CartItemProps[];
  addToCart: (item: CartItemProps) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  setCart: React.Dispatch<React.SetStateAction<CartItemProps[]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItemProps[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      const stored = await AsyncStorage.getItem("@cart");
      if (stored) {
        setCart(JSON.parse(stored));
      }
    };
    loadCart();
  }, []);

  const saveCart = async (updatedCart: CartItemProps[]) => {
    setCart(updatedCart);
    await AsyncStorage.setItem("@cart", JSON.stringify(updatedCart));
  };

  const addToCart = (item: CartItemProps) => {
    const sameRestaurant =
      cart.length === 0 || cart[0].restaurantId === item.restaurantId;

    if (!sameRestaurant) {
      // Substitui carrinho por item de outro restaurante
      saveCart([item]);
      return;
    }

    const existingIndex = cart.findIndex((i) => i.id === item.id);

    let updatedCart = [...cart];

    if (existingIndex >= 0) {
      updatedCart[existingIndex].quantity += item.quantity;
    } else {
      updatedCart.push(item);
    }

    saveCart(updatedCart);
  };

  const removeFromCart = (itemId: string) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    saveCart(updatedCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, setCart }}
    >
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
