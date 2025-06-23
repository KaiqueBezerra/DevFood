import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { RestaurantsItem } from "./restaurants-item";

import { restaurantApi } from "@/src/repositories/restaurant-repository";

export interface RestaurantProps {
  id: string;
  name: string;
  image: string;
  bgImage: string;
  rating: number;
  location: string;
  distance: number;
  time: string;
  delivery: number;
  reviews: number;
}

export function Restaurants() {
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
    <View className="px-4 flex-1 w-full h-full mb-11 gap-4">
      {restaurants.map((item) => (
        <RestaurantsItem key={item.id} restaurant={item} />
      ))}
    </View>
  );
}
