import { foodApi } from "@/src/repositories/food-repository";
import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

import { FoodItem } from "./food";

import { FoodProps } from "@/src/types/food";

export function TrendingFoods() {
  const [foods, setFoods] = useState<FoodProps[]>([]);

  useEffect(() => {
    async function getFoods() {
      const { data, status } = await foodApi.getFoods();

      if (status !== 200) {
        console.error("Erro ao buscar refeições:", status);
        return;
      }

      setFoods(data);
    }

    getFoods();
  }, []);

  if (!foods) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={foods}
      renderItem={({ item }) => <FoodItem food={item} />}
      horizontal={true}
      contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
      showsHorizontalScrollIndicator={false}
    />
  );
}
