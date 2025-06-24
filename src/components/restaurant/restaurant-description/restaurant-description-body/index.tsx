import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { FoodProps } from "../../../index/trending";
import { Food } from "../../../index/trending/food";

import { RestaurantProps } from "@/src/components/index/restaurants";

import { foodApi } from "@/src/repositories/food-repository";

export function RestaurantDescriptionBody({
  restaurant,
}: {
  restaurant: RestaurantProps;
}) {
  const [foods, setFoods] = useState<FoodProps[]>([]);

  useEffect(() => {
    async function getFoods() {
      const { data, status } = await foodApi.getFoodsByRestaurant({
        id: restaurant.id,
      });

      if (status !== 200) {
        console.error("Erro ao buscar refeições:", status);
        return;
      }

      setFoods(data);
    }

    getFoods();
  }, [restaurant.id]);

  return (
    <View>
      <Text className="text-2xl font-semibold px-4 mb-4">Destaques</Text>
      <FlatList
        data={foods}
        renderItem={({ item }) => <Food food={item} />}
        horizontal={true}
        contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
        showsHorizontalScrollIndicator={false}
      />

      <Text className="text-2xl font-semibold px-4 my-4">Lançamentos</Text>
      <View className="gap-4 mb-6">
        {foods.map((item) => (
          <TouchableOpacity
            className="w-full flex flex-row rounded-xl px-6 py-6 border-y border-gray-200"
            onPress={() =>
              router.push({
                pathname: "/food/[id]",
                params: { id: item.id, restaurantId: item.restaurantId },
              })
            }
            key={item.id}
            activeOpacity={0.5}
          >
            <View className="w-[70%]">
              <Text className="font-semibold mt-1 text-lg" numberOfLines={1}>
                {item.name}
              </Text>

              <Text className="text-gray-500 text-sm" numberOfLines={2}>
                {item.description}
              </Text>

              <Text className="font-semibold mt-2">
                R$ {item.price.toFixed(2).replace(".", ",")}
              </Text>
            </View>

            <Image
              source={{ uri: item.image }}
              className="ml-auto rounded-xl w-[25%]"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
