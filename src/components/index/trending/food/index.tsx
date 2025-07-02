import { restaurantApi } from "@/src/repositories/restaurant-repository";

import { FoodProps } from "@/src/types/food";
import { RestaurantProps } from "@/src/types/restaurant";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export function FoodItem({ food }: { food: FoodProps }) {
  const [restaurant, setRestaurant] = useState<RestaurantProps>();

  useEffect(() => {
    const getRestaurant = async () => {
      const { data, status } = await restaurantApi.getRestaurant(
        food.restaurantId
      );

      if (status === 200) {
        setRestaurant(data);
      }
    };

    getRestaurant();
  }, [food.restaurantId]);

  return (
    <TouchableOpacity
      className="flex flex-col rounded-xl relative w-44"
      onPress={() =>
        router.push({
          pathname: "/food/[id]",
          params: { id: food.id, restaurantId: food.restaurantId },
        })
      }
      activeOpacity={0.5}
    >
      <Image source={{ uri: food.image }} className="w-44 h-36 rounded-xl" />

      <View
        className="flex flex-row bg-neutral-900/90 gap-1 rounded-full
        absolute top-2 right-2 px-2 py-1 items-center justify-center"
      >
        <Ionicons name="star" size={24} color={"#ca8a04"} />
        <Text className="text-white text-sm">{food.rating}</Text>
      </View>

      <Text className="text-green-700 font-medium text-lg">
        R$ {food.price.toFixed(2).replace(".", ",")}
      </Text>
      <Text className="text-black mt-1" numberOfLines={1}>
        {food.name}
      </Text>
      <Text className="text-neutral-600 text-sm">
        {food.time}
        {restaurant && (
          <Text> - R$ {restaurant.delivery.toFixed(2).replace(".", ",")}</Text>
        )}
      </Text>
    </TouchableOpacity>
  );
}
