import { ScrollView, View } from "react-native";

import Constants from "expo-constants";

import { Banner } from "./banner";
import { FamousRestaurants } from "./famous-restaurants";
import { Header } from "./header";
import { Restaurants } from "./restaurants";
import { Search } from "./search";
import { Section } from "./section";
import { TrendingFoods } from "./trending";

const statusBarHeight = Constants.statusBarHeight;

export function Index() {
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View className="w-full px-4" style={{ marginTop: statusBarHeight + 8 }}>
        <Header />

        <Banner />

        <Search />
      </View>

      <Section name="Comida em alta" size="text-2xl" label="Veja mais" />
      <TrendingFoods />

      <Section name="Famosos no DevFood" size="text-xl" label="Veja todos" />
      <FamousRestaurants />

      <Section name="Restaurantes" size="text-2xl" label="Veja todos" />
      <Restaurants />
    </ScrollView>
  );
}
