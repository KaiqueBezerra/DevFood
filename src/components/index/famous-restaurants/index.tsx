import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

import { FamousRestaurantItem } from "./famous-restaurants-item";

import { restaurantApi } from "@/src/repositories/restaurant-repository";

import { RestaurantProps } from "@/src/types/restaurant";

export function FamousRestaurants() {
  const [restaurants, setRestaurants] = useState<RestaurantProps[]>([]);

  useEffect(() => {
    async function getFoods() {
      const { data, status } = await restaurantApi.getRestaurants();

      if (status !== 200) {
        console.error("Erro ao buscar restaurantes:", status);
        return;
      }

      setRestaurants(data);
    }

    getFoods();
  }, []);

  if (!restaurants) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={restaurants}
      renderItem={({ item }) => <FamousRestaurantItem restaurant={item} />}
      horizontal={true}
      contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
      showsHorizontalScrollIndicator={false}
    />
  );
}
