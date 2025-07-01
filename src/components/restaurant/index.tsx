import { ScrollView, View } from "react-native";

import { RestaurantDescriptionBody } from "./restaurant-description/restaurant-description-body";
import { RestaurantDescriptionHeader } from "./restaurant-description/restaurant-description-header";

import { RestaurantProps } from "@/src/types/restaurant";

export function Restaurant({
  restaurant,
  statusBarHeight,
}: {
  restaurant: RestaurantProps;
  statusBarHeight: number;
}) {
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View className="min-h-screen">
        <RestaurantDescriptionHeader
          restaurant={restaurant}
          statusBarHeight={statusBarHeight}
        />

        <RestaurantDescriptionBody restaurant={restaurant} />
      </View>
    </ScrollView>
  );
}
