import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { FoodProps } from "../..";

export function FoodDescriptionFooter({ food }: { food: FoodProps }) {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const price = food.price;
  const total = food.price * quantity;
  const formattedTotal = `R$ ${total.toFixed(2).replace(".", ",")}`;

  const isAddDisabled = total < price;

  return (
    <View className="w-full flex-row px-6 py-4 items-center border-t border-gray-100">
      <View className="flex-row items-center gap-6 w-[20%]">
        <TouchableOpacity onPress={handleDecrease} disabled={quantity === 1}>
          <Ionicons
            name="remove"
            size={26}
            color={quantity === 1 ? "#ccc" : "#EA1D2C"}
          />
        </TouchableOpacity>

        <Text>{quantity}</Text>

        <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
          <Ionicons name="add" size={26} color="#EA1D2C" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        disabled={isAddDisabled}
        className="ml-auto flex-row justify-between p-4 rounded-md w-[65%]"
        style={{
          backgroundColor: isAddDisabled ? "#dedede" : "#EA1D2C",
        }}
        activeOpacity={0.7}
      >
        <Text className="text-white font-semibold">Adicionar </Text>
        <Text className="text-white font-semibold">{formattedTotal}</Text>
      </TouchableOpacity>
    </View>
  );
}
