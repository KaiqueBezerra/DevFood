import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import Constants from "expo-constants";

import { foodApi } from "@/src/repositories/food-repository";
import { restaurantApi } from "@/src/repositories/restaurant-repository";

import { RestaurantProps } from "@/src/components/restaurants";
import { FoodProps } from "@/src/components/trending";

import { FoodDescriptionBody } from "@/src/components/food-description/food-description-body";
import { FoodDescriptionFooter } from "@/src/components/food-description/food-description-footer";
import { FoodDescriptionHeader } from "@/src/components/food-description/food-description-header";

const statusBarHeight = Constants.statusBarHeight;

export default function Food() {
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
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View className="min-h-screen">
        <FoodDescriptionHeader
          food={food}
          restaurant={restaurant}
          statusBarHeight={statusBarHeight}
        />
        <FoodDescriptionBody food={food} />

        <View className="mt-auto">
          <FoodDescriptionFooter food={food} />
        </View>
      </View>
    </ScrollView>
  );
}
