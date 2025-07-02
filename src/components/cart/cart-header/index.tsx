import { useCart } from "@/src/context/cart-context";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export function CartHeader() {
  const { clearCart } = useCart();

  return (
    <View className="flex-row w-full px-6 items-center justify-between">
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <Ionicons
          name="chevron-down"
          size={20}
          color="#EA1D2C"
          className="font-semibold"
        />
      </TouchableOpacity>

      <View className="flex flex-col items-center justify-center">
        <Text className="text-center font-semibold uppercase">Sacola</Text>
      </View>

      <TouchableOpacity onPress={clearCart}>
        <Text
          className="text-center font-semibold"
          style={{ color: "#EA1D2C" }}
        >
          Limpar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
