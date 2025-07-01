import { Cart } from "@/src/components/cart";

import { useCart } from "@/src/context/cart-context";

export default function CartPage() {
  const { cart } = useCart();

  if (!cart) {
    return null;
  }

  return <Cart cart={cart} />;
}
