import { ScrollView, View } from "react-native";

import { FoodDescriptionBody } from "./food-description/food-description-body";
import { FoodDescriptionFooter } from "./food-description/food-description-footer";
import { FoodDescriptionHeader } from "./food-description/food-description-header";

import { RestaurantProps } from "../restaurant";

export interface FoodProps {
  id: string;
  name: string;
  description: string;
  tags: string[];
  price: number;
  time: string;
  delivery: number;
  rating: number;
  image: string;
  restaurantId: string;
}

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
      <View className="min-h-screen">
        <FoodDescriptionHeader
          food={food}
          restaurant={restaurant}
          statusBarHeight={statusBarHeight}
        />
        <FoodDescriptionBody food={food} />

        <View className="mt-auto">
          <FoodDescriptionFooter food={food} />
        </View>
      </View>
    </ScrollView>
  );
}
