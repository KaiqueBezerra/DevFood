import Constants from "expo-constants";
import { ScrollView, View } from "react-native";

import { CartBody } from "./cart-body";
import { CartFooter } from "./cart-footer";
import { CartHeader } from "./cart-header";

import { CartItemProps } from "@/src/types/cart";

const statusBarHeight = Constants.statusBarHeight;

export function Cart({ cart }: { cart: CartItemProps[] }) {
  return (
    <View style={{ flex: 1, paddingTop: statusBarHeight }}>
      <ScrollView
        style={{ flex: 1, marginBottom: 100 }} // space for the footer not to cover
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full gap-8">
          <CartHeader />
          <CartBody cart={cart} />
        </View>
      </ScrollView>

      {/* Fixed footer */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <CartFooter cart={cart} />
      </View>
    </View>
  );
}
