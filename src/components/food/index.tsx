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
    <View style={{ flex: 1 }}>
      {/* Conteúdo rolável */}
      <ScrollView
        style={{ flex: 1, marginBottom: 100 }}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full">
          <FoodDescriptionHeader
            food={food}
            restaurant={restaurant}
            statusBarHeight={statusBarHeight}
          />
          <FoodDescriptionBody food={food} />
        </View>
      </ScrollView>

      {/* Footer fixo */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          borderTopWidth: 1,
          borderColor: "#eee",
        }}
      >
        <FoodDescriptionFooter food={food} restaurant={restaurant} />
      </View>
    </View>
  );
}
