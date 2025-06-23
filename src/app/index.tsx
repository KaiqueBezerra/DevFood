import { ScrollView, View } from "react-native";

import Constants from "expo-constants";

import { Banner } from "../components/banner";
import { FamousRestaurants } from "../components/famous-restaurants";
import { Header } from "../components/header";
import { Restaurants } from "../components/restaurants";
import { Search } from "../components/search";
import { Section } from "../components/section";
import { TrendingFoods } from "../components/trending";

const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View className="w-full px-4" style={{ marginTop: statusBarHeight + 8 }}>
        <Header />

        <Banner />

        <Search />
      </View>

      <Section
        name="Comida em alta"
        size="text-2xl"
        label="Veja mais"
        action={() => console.log("CLICOU NO VEJA MAIS")}
      />
      <TrendingFoods />

      <Section
        name="Famosos no DevFood"
        size="text-xl"
        label="Veja todos"
        action={() => console.log("CLICOU NO FAMOSOS")}
      />
      <FamousRestaurants />

      <Section
        name="Restaurantes"
        size="text-2xl"
        label="Veja todos"
        action={() => console.log("CLICOU NO RESTAURANTE")}
      />
      <Restaurants />
    </ScrollView>
  );
}
