import { View } from "react-native";
import "../styles/global.css";

import { Slot } from "expo-router";
import { CartPreview } from "../components/cart-preview";
import { CartProvider } from "../context/cart-context";

export default function RootLayout() {
  return (
    <CartProvider>
      <View className="flex-1">
        <View className="flex-1">
          <Slot />
        </View>

        <CartPreview />
      </View>
    </CartProvider>
  );
}
