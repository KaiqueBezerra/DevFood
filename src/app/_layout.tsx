import { View } from "react-native";
import "../styles/global.css";

import { Slot } from "expo-router";
import { CartPreview } from "../components/cart-preview";

export default function RootLayout() {
  return (
    <View className="flex-1">
      <View className="flex-1">
        <Slot />
      </View>

      <CartPreview />
    </View>
  );
}
