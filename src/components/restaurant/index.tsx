import { ScrollView, View } from "react-native";

import { RestaurantDescriptionBody } from "./restaurant-description/restaurant-description-body";
import { RestaurantDescriptionHeader } from "./restaurant-description/restaurant-description-header";

export interface RestaurantProps {
  id: string;
  name: string;
  image: string;
  bgImage: string;
  rating: number;
  location: string;
  distance: number;
  time: string;
  delivery: number;
  reviews: number;
}

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
