import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { FoodItem } from "../../index/trending/food";

import { foodApi } from "@/src/repositories/food-repository";

import { CartItemProps } from "@/src/types/cart";
import { FoodProps } from "@/src/types/food";

export function CartBody({ cart }: { cart: CartItemProps }) {
  const [quantity, setQuantity] = useState(cart.quantity);
  const [foods, setFoods] = useState<FoodProps[]>([]);

  useEffect(() => {
    const getFoods = async () => {
      const { data, status } = await foodApi.getFoodsByRestaurant({
        id: cart.restaurantId,
      });

      if (status !== 200) {
        console.error("Erro ao buscar refeições:", status);
        return;
      }

      setFoods(data);
    };

    getFoods();
  }, [cart.restaurantId]);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const subtotal = quantity * cart.price;
  const total = cart.delivery ? subtotal + cart.delivery : subtotal;

  return (
    <View className="w-full px-6 gap-8">
      <View className="w-full flex-row items-center gap-4">
        <Image
          source={{ uri: cart.restaurantImage }}
          className="size-10 rounded-full w-[10%]"
        />
        <View className="w-[80%]">
          <Text className="font-semibold text-lg" numberOfLines={1}>
            {cart.name} - {cart.location}
          </Text>

          <Text className="font-semibold" style={{ color: "#EA1D2C" }}>
            Adicionar mais itens
          </Text>
        </View>
      </View>

      <View className="w-full">
        <Text className="text-lg font-semibold mb-6">Itens adicionados</Text>

        <View className="w-full flex-row gap-4">
          <Image source={{ uri: cart.image }} className="size-16 rounded-lg" />

          <View className="flex-row justify-between w-[80%] gap-2">
            <View className="w-[65%]">
              <Text className="font-semibold" numberOfLines={1}>
                {cart.name}
              </Text>

              <Text className="text-sm text-gray-500" numberOfLines={1}>
                {cart.description}
              </Text>

              <Text className="font-semibold mt-2">R$ {cart.price}</Text>
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

      <View>
        <Text className="font-semibold text-lg mb-4">Resumo de valores</Text>

        <View className="gap-2">
          <View className="flex-row justify-between">
            <Text className="text-gray-500 text-sm">Subtotal</Text>
            <Text className="text-gray-500 text-sm">
              R$ {subtotal.toFixed(2).replace(".", ",")}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-500 text-sm">Taxa de entrega</Text>
            <Text className="text-gray-500 text-sm">
              R$ {cart.delivery.toFixed(2).replace(".", ",")}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="font-semibold">Total</Text>
            <Text className="font-semibold">
              R$ {total.toFixed(2).replace(".", ",")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
