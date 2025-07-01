import { Text, TouchableOpacity, View } from "react-native";

import { router } from "expo-router";

import { CartItemProps } from "@/src/types/cart";

export function CartFooter({ cart }: { cart: CartItemProps }) {
  const total = cart.quantity * cart.price + cart.delivery;

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
              / {cart.quantity} {cart.quantity > 1 ? "itens" : "item"}
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
        onPress={() => router.push("/cart/page")}
      >
        <Text className="text-white font-semibold">Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}
