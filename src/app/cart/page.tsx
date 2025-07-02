import { router } from "expo-router";
import { useEffect } from "react";

import { Cart } from "@/src/components/cart";

import { useCart } from "@/src/context/cart-context";

export default function CartPage() {
  const { cart } = useCart();

  // ✅ Redireciona se o carrinho estiver vazio
  useEffect(() => {
    if (!Array.isArray(cart) || cart.length === 0) {
      router.replace("/");
    }
  }, [cart]);

  if (!Array.isArray(cart) || cart.length === 0) {
    return null; // evita renderização momentânea
  }

  return <Cart cart={cart} />;
}
