import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { CartItemProps } from "@/src/types/cart";

export function CartFooter({ cart }: { cart: CartItemProps[] }) {
  if (!cart || cart.length === 0) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const delivery = 5.99; // valor fixo ou pode vir do restaurante
  const total = subtotal + delivery;

  return (
    <View className="w-full flex-row px-6 py-4 pb-6 items-center border-t border-gray-100">
      <View className="flex-row items-center gap-2 w-[50%]">
        <View>
          <Text className="text-gray-500 text-sm">Total com a entrega</Text>
          <View className="flex flex-row items-center">
            <Text className="font-semibold">
              R$ {total.toFixed(2).replace(".", ",")}
            </Text>
            <Text className="text-gray-500 text-sm">
              {" "}
              / {quantity} {quantity > 1 ? "itens" : "item"}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        className="flex-row items-center justify-center p-4 rounded-md w-[50%]"
        style={{
          backgroundColor: "#EA1D2C",
        }}
        activeOpacity={0.7}
        onPress={() => router.push("/cart/page")} // ou próxima rota
      >
        <Text className="text-white font-semibold">Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}
