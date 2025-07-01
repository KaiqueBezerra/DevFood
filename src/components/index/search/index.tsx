import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { foodApi } from "@/src/repositories/food-repository";
import { restaurantApi } from "@/src/repositories/restaurant-repository";

import { FoodProps } from "@/src/types/food";
import { RestaurantProps } from "@/src/types/restaurant";



// Item type
type SearchItem =
  | (FoodProps & { type: "food" })
  | (RestaurantProps & { type: "restaurant" });

export function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 0) {
        fetchResults();
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce); // clean the timeout if the user types before 1s
  }, [query]);

  const fetchResults = async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);

      const { data: food, status: foodStatus } =
        await foodApi.getFoodsBySearch(query);
      const { data: restaurant, status: restaurantStatus } =
        await restaurantApi.getRestaurantBySearch(query);

      const foodResults: SearchItem[] =
        foodStatus === 200 && food?.length
          ? food.map((item: FoodProps) => ({
              ...item,
              type: "food",
            }))
          : [];

      const restaurantResults: SearchItem[] =
        restaurantStatus === 200 && restaurant?.length
          ? restaurant.map((item: RestaurantProps) => ({
              ...item,
              type: "restaurant",
            }))
          : [];

      setResults([...foodResults, ...restaurantResults]);
    } catch (error) {
      console.error("Erro ao buscar:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePress = (item: SearchItem) => {
    if (item.type === "food") {
      router.push({
        pathname: "/food/[id]",
        params: { id: item.id, restaurantId: item.restaurantId },
      });
    } else {
      router.push({
        pathname: "/restaurant/[id]",
        params: { id: item.id },
      });
    }
  };

  return (
    <View className="w-full px-4">
      <View className="flex-row border border-slate-500 h-14 rounded-full items-center px-4 bg-transparent">
        <Feather name="search" size={24} color="#64748b" />
        <TextInput
          placeholder="O que você procura?"
          value={query}
          onChangeText={setQuery}
          className="flex-1 ml-2"
        />
      </View>

      {loading ? (
        <ActivityIndicator className="mt-4" />
      ) : (
        <View className="mt-4">
          {results.map((item) => (
            <TouchableOpacity
              key={`${item.type}-${item.id}`}
              onPress={() => handlePress(item)}
              className="flex flex-row gap-2 items-center py-4 border-b border-gray-200"
            >
              <View>
                <Image source={{ uri: item.image }} className="w-12 h-12" />
              </View>

              <View>
                <Text>{item.name}</Text>
                <Text className="text-xs text-gray-500">
                  {item.type === "food" ? "Comida" : "Restaurante"}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
