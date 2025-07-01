import { ScrollView, View } from "react-native";

import { FoodDescriptionBody } from "./food-description/food-description-body";
import { FoodDescriptionFooter } from "./food-description/food-description-footer";
import { FoodDescriptionHeader } from "./food-description/food-description-header";

import { FoodProps } from "@/src/types/food";
import { RestaurantProps } from "@/src/types/restaurant";

export function Food({
  food,
  restaurant,
  statusBarHeight,
}: {
  food: FoodProps;
  restaurant: RestaurantProps;
  statusBarHeight: number;
}) {
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View className="min-h-screen w-full">
        <FoodDescriptionHeader
          food={food}
          restaurant={restaurant}
          statusBarHeight={statusBarHeight}
        />
        <FoodDescriptionBody food={food} />

        <View className="mt-auto">
          <FoodDescriptionFooter food={food} restaurant={restaurant} />
        </View>
      </View>
    </ScrollView>
  );
}
