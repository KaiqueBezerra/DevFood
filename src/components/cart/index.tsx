import { ScrollView, View } from "react-native";

import { CartHeader } from "./cart-header";

import Constants from "expo-constants";

import { FoodProps } from "../food";
import { RestaurantProps } from "../restaurant";
import { CartBody } from "./cart-body";

const statusBarHeight = Constants.statusBarHeight;

export function Cart({
  food,
  restaurant,
}: {
  food: FoodProps;
  restaurant: RestaurantProps;
}) {
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View
        className="w-full px-4 gap-8"
        style={{ marginTop: statusBarHeight + 8 }}
      >
        <CartHeader />

        <CartBody restaurant={restaurant} food={food} />
      </View>
    </ScrollView>
  );
}
