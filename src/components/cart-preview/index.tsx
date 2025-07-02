import { router, usePathname } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { useCart } from "@/src/context/cart-context";

export function CartPreview() {
  const pathname = usePathname();
  const { cart } = useCart();

  // Oculta em rotas específicas
  if (pathname.includes("/cart") || pathname.includes("/food")) {
    return null;
  }

  // Se carrinho for undefined ou vazio, não renderiza
  if (!Array.isArray(cart) || cart.length === 0) {
    return null;
  }

  // Agora é seguro usar reduce
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View className="w-full flex-row px-6 py-4 pb-6 items-center border-t border-gray-100">
      <View className="flex-row items-center gap-2 w-[50%]">
        <Image
          source={{ uri: cart[0].restaurantImage }}
          className="w-10 h-10 rounded-full"
        />
        <View>
          <Text className="text-gray-500 text-sm">Total sem a entrega</Text>
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
        onPress={() => router.push("/cart/page")}
      >
        <Text className="text-white font-semibold">Ver sacola</Text>
      </TouchableOpacity>
    </View>
  );
}
