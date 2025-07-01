import { FoodProps } from "@/src/types/food";

import { Text, View } from "react-native";

export function FoodDescriptionBody({ food }: { food: FoodProps }) {
  return (
    <View className="bg-white px-6 py-8 rounded-t-3xl relative bottom-4">
      <Text className="text-xl font-semibold">{food.name}</Text>
      <View className="gap-4">
        <Text className="mt-2 tracking-wider text-gray-500">
          {food.description}
        </Text>

        <Text className="mt-2 tracking-wider text-gray-500">
          {food.tags.join(" - ")}
        </Text>
      </View>

      <Text className="mt-4 text-lg font-semibold">
        R$ {food.price.toFixed(2).replace(".", ",")}
      </Text>
    </View>
  );
}
