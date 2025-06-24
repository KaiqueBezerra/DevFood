import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { RestaurantProps } from "@/src/components/index/restaurants";

export function RestaurantDescriptionHeader({
  restaurant,
  statusBarHeight,
}: {
  restaurant: RestaurantProps;
  statusBarHeight: number;
}) {
  function formatarNumero(valor: number) {
    if (valor >= 1000) {
      let valorFormatado = (valor / 1000).toFixed(1).replace(".", ",");

      valorFormatado = valorFormatado.endsWith(",0")
        ? valorFormatado.slice(0, -2)
        : valorFormatado;

      return `${valorFormatado} mil`;
    }
    return valor.toString();
  }

  return (
    <View className="w-full relative">
      <Image source={{ uri: restaurant.bgImage }} className="w-full h-60" />

      <View className="w-full px-4 absolute" style={{ top: statusBarHeight }}>
        <TouchableOpacity
          className="w-10 h-10 bg-white rounded-full items-center justify-center"
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={20} color="#EA1D2C" />
        </TouchableOpacity>
      </View>

      <View className="w-full px-6">
        <View className="bg-white px-6 rounded-3xl relative bottom-12 border border-gray-200">
          <View className="items-center bottom-11">
            <Image
              source={{ uri: restaurant.image }}
              className="w-20 h-20 rounded-full border-2 border-white"
            />
          </View>

          <View className="w-full bottom-8">
            <View className="flex-row items-center">
              <Text className="text-xl font-semibold" numberOfLines={3}>
                {restaurant.name} - {restaurant.location}{" "}
              </Text>
            </View>

            <View className="w-full">
              <Text className="text-gray-500 text-sm pb-4">
                Entrega rastreável ● {restaurant.distance} km ● R$ 15,00
              </Text>
            </View>

            <View className="w-full flex-row gap-1 items-center py-4 border-y border-gray-200">
              <Ionicons name="star" size={14} color="#121212" />
              <Text className="text-sm font-bold">{restaurant.rating} </Text>
              <Text className="text-sm">
                {restaurant.reviews &&
                  `(${formatarNumero(restaurant.reviews)} ${
                    restaurant.reviews === 1 ? "avaliação" : "avaliações"
                  })`}
              </Text>
            </View>

            <View className="w-full flex-row items-center pt-4">
              <Text className="text-sm font-bold">Padrão ● </Text>

              <Text className="text-sm">{restaurant.time} ● </Text>

              <Text className="text-sm font-bold">
                {" "}
                R$ {restaurant.delivery}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
