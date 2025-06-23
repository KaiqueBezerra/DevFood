import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { RestaurantProps } from "../../famous-restaurants";

export function RestaurantsItem({
  restaurant,
}: {
  restaurant: RestaurantProps;
}) {
  return (
    <TouchableOpacity
      className="flex flex-row items-center justify-start gap-2"
      activeOpacity={0.5}
      onPress={() =>
        router.push({
          pathname: "/restaurant/[id]",
          params: { id: restaurant.id },
        })
      }
    >
      <Image
        source={{ uri: restaurant.image }}
        className="w-20 h-20 rounded-full"
      />

      <View className="flex gap-2">
        <Text
          className="text-base text-black leading-4 font-bold"
          numberOfLines={1}
        >
          {restaurant.name}
        </Text>

        <View className="flex flex-row items-center gap-1">
          <Ionicons name="star" size={14} color={"#ca8a04"} />
          <Text className="text-sm">{restaurant.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
