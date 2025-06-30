import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { FoodItem } from "../../index/trending/food";

import { foodApi } from "@/src/repositories/food-repository";

import { FoodProps } from "../../food";
import { RestaurantProps } from "../../restaurant";

export function CartBody({
  restaurant,
  food,
}: {
  restaurant: RestaurantProps;
  food: FoodProps;
}) {
  const [quantity, setQuantity] = useState(1);
  const [foods, setFoods] = useState<FoodProps[]>([]);

  useEffect(() => {
    const getFoods = async () => {
      const { data, status } = await foodApi.getFoodsByRestaurant({
        id: restaurant.id,
      });

      if (status !== 200) {
        console.error("Erro ao buscar refeições:", status);
        return;
      }

      setFoods(data);
    };

    getFoods();
  }, [restaurant.id]);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View className="w-full px-4 gap-8">
      <View className="w-full flex-row items-center gap-4">
        <Image
          source={{ uri: restaurant.bgImage }}
          className="size-10 rounded-full"
        />
        <View className="w-full">
          <Text className="font-semibold text-lg" numberOfLines={1}>
            {restaurant.name} - {restaurant.location}
          </Text>

          <Text className="font-semibold" style={{ color: "#EA1D2C" }}>
            Adicionar mais itens
          </Text>
        </View>
      </View>

      <View className="w-full">
        <Text className="text-lg font-semibold mb-6">Itens adicionados</Text>

        <View className="w-full flex-row gap-4">
          <Image source={{ uri: food.image }} className="size-16 rounded-lg" />

          <View className="flex-row justify-between w-[80%] gap-2">
            <View className="w-[65%]">
              <Text className="font-semibold" numberOfLines={1}>
                {food.name}
              </Text>

              <Text className="text-sm text-gray-500" numberOfLines={1}>
                {food.description}
              </Text>

              <Text className="font-semibold mt-2">R$ {food.price}</Text>
            </View>

            <View className="flex-row w-[35%] bg-gray-100 rounded-lg h-12 items-center justify-between px-1">
              {quantity === 1 ? (
                <TouchableOpacity onPress={handleDecrease}>
                  <Ionicons name="trash" size={20} color="#EA1D2C" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handleDecrease}>
                  <Ionicons name="remove" size={20} color="#EA1D2C" />
                </TouchableOpacity>
              )}

              <Text>{quantity}</Text>

              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Ionicons name="add" size={20} color="#EA1D2C" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text
          className="font-semibold text-center mt-8"
          style={{ color: "#EA1D2C" }}
        >
          Adicionar mais itens
        </Text>
      </View>

      <View>
        <Text className="font-semibold text-lg mb-4">Peça Também</Text>

        <FlatList
          data={foods}
          renderItem={({ item }) => <FoodItem food={item} />}
          horizontal={true}
          contentContainerStyle={{ gap: 14, paddingRight: 16 }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
