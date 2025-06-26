import { Image, Text, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export interface CartItem {
  id: string;
  quantity: number;
  restaurantId: number;
  price: number;
  restaurantImage: string;
}

export function CartPreview() {
  const [item, setItem] = useState<CartItem>();

  useEffect(() => {
    const getItem = async () => {
      const stored = await AsyncStorage.getItem("@food");

      if (stored) {
        setItem(JSON.parse(stored));
      }
    };

    getItem();
  }, []);

  console.log(item);

  if (!item) {
    return null;
  }

  return (
    <View className="w-full flex-row px-6 py-4 pb-6 items-center border-t border-gray-100">
      <View className="flex-row items-center gap-2 w-[50%]">
        <Image
          source={{ uri: item.restaurantImage }}
          className="w-10 h-10 rounded-full"
        />
        <View>
          <Text className="text-gray-500 text-sm">Total sem a entrega</Text>
          <View className="flex flex-row items-center">
            <Text className="font-semibold">
              R$ {item.quantity * item.price} /{" "}
            </Text>
            <Text className="text-gray-500 text-sm">{item.quantity} itens</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        className="flex-row items-center justify-center p-4 rounded-md w-[50%]"
        style={{
          backgroundColor: "#EA1D2C",
        }}
      >
        <Text className="text-white font-semibold">Ver sacola</Text>
      </TouchableOpacity>
    </View>
  );
}
