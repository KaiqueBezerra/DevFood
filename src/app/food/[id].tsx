import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import Constants from "expo-constants";

import { foodApi } from "@/src/repositories/food-repository";
import { restaurantApi } from "@/src/repositories/restaurant-repository";

import { Food, FoodProps } from "@/src/components/food";
import { RestaurantProps } from "@/src/components/restaurant";

const statusBarHeight = Constants.statusBarHeight;

export default function FoodPage() {
  const [food, setFood] = useState<FoodProps | null>(null);
  const [restaurant, setRestaurant] = useState<RestaurantProps | null>(null);

  const { id, restaurantId } = useLocalSearchParams<{
    id: string;
    restaurantId: string;
  }>();

  useEffect(() => {
    async function getFood() {
      const { data, status } = await foodApi.getFood(id);

      if (status !== 200) {
        console.error("Erro ao buscar refeição:", status);
        return;
      }

      setFood(data);
    }

    getFood();
  }, [id]);

  useEffect(() => {
    async function getRestaurant() {
      const { data, status } = await restaurantApi.getRestaurant(restaurantId);

      if (status !== 200) {
        console.error("Erro ao buscar restaurante:", status);
        return;
      }

      setRestaurant(data);
    }

    getRestaurant();
  }, [restaurantId]);

  if (!food || !restaurant) {
    return null;
  }

  return (
    <Food
      food={food}
      restaurant={restaurant}
      statusBarHeight={statusBarHeight}
    />
  );
}
