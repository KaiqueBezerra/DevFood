import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import Constants from "expo-constants";

import { restaurantApi } from "@/src/repositories/restaurant-repository";

import { RestaurantProps } from "@/src/components/restaurants";

import { RestaurantDescriptionHeader } from "@/src/components/restaurant-description/restaurant-description-header";

const statusBarHeight = Constants.statusBarHeight;

export default function Restaurant() {
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
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View className="min-h-screen">
        <RestaurantDescriptionHeader
          restaurant={restaurant}
          statusBarHeight={statusBarHeight}
        />
      </View>
    </ScrollView>
  );
}
