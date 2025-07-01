import { ScrollView, View } from "react-native";

import Constants from "expo-constants";

import { CartBody } from "./cart-body";
import { CartFooter } from "./cart-footer";
import { CartHeader } from "./cart-header";

import { CartItemProps } from "@/src/types/cart";

const statusBarHeight = Constants.statusBarHeight;

export function Cart({ cart }: { cart: CartItemProps }) {
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View
        className="min-h-screen w-full gap-8"
        style={{ marginTop: statusBarHeight + 8 }}
      >
        <CartHeader />

        <CartBody cart={cart} />

        <View className="mt-auto">
          <CartFooter cart={cart} />
        </View>
      </View>
    </ScrollView>
  );
}
