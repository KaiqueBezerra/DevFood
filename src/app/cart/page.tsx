import { router } from "expo-router";
import { useEffect } from "react";

import { Cart } from "@/src/components/cart";

import { useCart } from "@/src/context/cart-context";

export default function CartPage() {
  const { cart } = useCart();

  // If the cart is empty, redirect to the home page
  useEffect(() => {
    if (!Array.isArray(cart) || cart.length === 0) {
      router.replace("/");
    }
  }, [cart]);

  if (!Array.isArray(cart) || cart.length === 0) {
    return null; // If the cart is empty, don't render anything
  }

  return <Cart cart={cart} />;
}
