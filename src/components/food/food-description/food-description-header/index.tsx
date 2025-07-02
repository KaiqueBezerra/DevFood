import { FoodProps } from "@/src/types/food";
import { RestaurantProps } from "@/src/types/restaurant";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export function FoodDescriptionHeader({
  food,
  restaurant,
  statusBarHeight,
}: {
  food: FoodProps;
  restaurant: RestaurantProps;
  statusBarHeight: number;
}) {
  return (
    <View className="w-full relative">
      <Image source={{ uri: food.image }} className="w-full h-96" />

      <View className="w-full px-4 absolute" style={{ top: statusBarHeight }}>
        <TouchableOpacity
          className="w-10 h-10 bg-white rounded-full items-center justify-center"
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={20} color="#EA1D2C" />
        </TouchableOpacity>
      </View>

      <View className="w-full absolute px-4 bottom-8">
        <View className="flex-row items-center gap-2 w-[70%] h-14 bg-white py-2 pl-1 rounded-full">
          <Image
            source={{ uri: restaurant.image }}
            className="w-12 h-12 rounded-full"
          />
          <View className="w-[75%]">
            <Text className="" numberOfLines={1}>
              {restaurant.name} - {restaurant.location}
            </Text>
            <Text className="text-sm">
              {food.time} ● R${" "}
              {restaurant.delivery.toFixed(2).replace(".", ",")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
