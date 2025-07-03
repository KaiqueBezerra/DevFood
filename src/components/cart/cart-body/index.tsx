import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { FoodItem } from "../../index/trending/food";

import { foodApi } from "@/src/repositories/food-repository";

import { useCart } from "@/src/context/cart-context";

import { CartItemProps } from "@/src/types/cart";
import { FoodProps } from "@/src/types/food";
import { router } from "expo-router";

export function CartBody({ cart }: { cart: CartItemProps[] }) {
  const { setCart } = useCart();
  const [foods, setFoods] = useState<FoodProps[]>([]);

  const restaurantId = cart[0]?.restaurantId;
  const restaurantImage = cart[0]?.restaurantImage;

  useEffect(() => {
    const getFoods = async () => {
      if (!restaurantId) return;

      const { data, status } = await foodApi.getFoodsByRestaurant({
        id: restaurantId,
      });

      if (status !== 200) {
        console.error("Erro ao buscar refeições:", status);
        return;
      }

      setFoods(data);
    };

    getFoods();
  }, [restaurantId]);

  const updateQuantity = async (itemId: string, amount: number) => {
    const updated = cart
      .map((item) => {
        if (item.id === itemId) {
          const newQty = item.quantity + amount;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItemProps[];

    setCart(updated);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = cart[0].delivery;
  const total = subtotal + delivery;

  return (
    <View className="w-full px-6 gap-8">
      {/* Header */}
      <TouchableOpacity
        onPress={() => router.push(`/restaurant/${restaurantId}`)}
        activeOpacity={0.5}
      >
        <View className="w-full flex-row items-center gap-4">
          <Image
            source={{ uri: restaurantImage }}
            className="size-10 rounded-full w-[10%]"
          />
          <View className="w-[80%]">
            <Text className="font-semibold text-lg" numberOfLines={1}>
              {cart[0]?.restaurantName} - {cart[0]?.location}
            </Text>

            <Text className="font-semibold" style={{ color: "#EA1D2C" }}>
              Adicionar mais itens
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Itens adicionados */}
      <View className="w-full">
        <Text className="text-lg font-semibold mb-6">Itens adicionados</Text>

        {cart.map((item) => (
          <View key={item.id} className="w-full flex-row gap-4 mb-4">
            <Image
              source={{ uri: item.image }}
              className="size-16 rounded-lg"
            />

            <View className="flex-row justify-between w-[80%] gap-2">
              <View className="w-[65%]">
                <Text className="font-semibold" numberOfLines={1}>
                  {item.name}
                </Text>

                <Text className="text-sm text-gray-500" numberOfLines={1}>
                  {item.description}
                </Text>

                <Text className="font-semibold mt-2">R$ {item.price}</Text>
              </View>

              <View className="flex-row w-[35%] bg-gray-100 rounded-lg h-12 items-center justify-between px-1">
                <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
                  <Ionicons
                    name={item.quantity === 1 ? "trash" : "remove"}
                    size={20}
                    color="#EA1D2C"
                  />
                </TouchableOpacity>

                <Text>{item.quantity}</Text>

                <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
                  <Ionicons name="add" size={20} color="#EA1D2C" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity
          onPress={() => router.push(`/restaurant/${restaurantId}`)}
        >
          <Text
            className="font-semibold text-center mt-8"
            style={{ color: "#EA1D2C" }}
          >
            Adicionar mais itens
          </Text>
        </TouchableOpacity>
      </View>

      {/* Peça também */}
      <View>
        <Text className="font-semibold text-lg mb-4">Peça Também</Text>

        <FlatList
          data={foods}
          renderItem={({ item }) => <FoodItem food={item} />}
          horizontal
          contentContainerStyle={{ gap: 14, paddingRight: 16 }}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Resumo de valores */}
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
              R$ {delivery.toFixed(2).replace(".", ",")}
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
