import { RestaurantProps } from "@/src/types/restaurant";

import { router } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";

export function FamousRestaurantItem({
  restaurant,
}: {
  restaurant: RestaurantProps;
}) {
  return (
    <TouchableOpacity
      className="flex flex-col items-center justify-center"
      onPress={() =>
        router.push({
          pathname: "/restaurant/[id]",
          params: { id: restaurant.id },
        })
      }
      activeOpacity={0.5}
    >
      <Image
        source={{ uri: restaurant.image }}
        className="w-20 h-20 rounded-full"
      />

      <Text
        className="text-sm mt-2 w-20 text-center leading-4 text-black"
        numberOfLines={1}
      >
        {restaurant.name}
      </Text>
    </TouchableOpacity>
  );
}
