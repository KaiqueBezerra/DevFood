import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import Constants from "expo-constants";

import { restaurantApi } from "@/src/repositories/restaurant-repository";

import { Restaurant } from "@/src/components/restaurant";

import { RestaurantProps } from "@/src/types/restaurant";

const statusBarHeight = Constants.statusBarHeight;

export default function RestaurantPage() {
  const [restaurant, setRestaurant] = useState<RestaurantProps | null>(null);

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  useEffect(() => {
    async function getRestaurant() {
      const { data, status } = await restaurantApi.getRestaurant(id);

      if (status !== 200) {
        console.error("Erro ao buscar restaurante:", status);
        return;
      }

      setRestaurant(data);
    }

    getRestaurant();
  }, [id]);

  if (!restaurant) {
    return null;
  }

  return (
    <Restaurant restaurant={restaurant} statusBarHeight={statusBarHeight} />
  );
}
