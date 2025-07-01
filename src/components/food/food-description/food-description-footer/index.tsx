import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useCart } from "@/src/context/cart-context";
import { FoodProps } from "@/src/types/food";
import { RestaurantProps } from "@/src/types/restaurant";

export function FoodDescriptionFooter({
  food,
  restaurant,
}: {
  food: FoodProps;
  restaurant: RestaurantProps;
}) {
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  const handleSubmit = async () => {
    const item = {
      id: food.id,
      name: food.name,
      description: food.description,
      image: food.image,
      quantity: quantity,
      restaurantId: restaurant.id,
      price: food.price,
      restaurantImage: restaurant.image,
      location: restaurant.location,
      delivery: food.delivery,
    };

    await addToCart(item);
  };

  useEffect(() => {
    const getItem = async () => {
      await AsyncStorage.getItem("@food");
    };

    getItem();
  }, []);

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
    <View className="w-full flex-row px-6 py-4 relative top-10 items-center border-t border-gray-100">
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
        onPress={handleSubmit}
      >
        <Text className="text-white font-semibold">Adicionar</Text>
        <Text className="text-white font-semibold">{formattedTotal}</Text>
      </TouchableOpacity>
    </View>
  );
}
