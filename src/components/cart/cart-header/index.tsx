import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export function CartHeader() {
  return (
    <View className="flex-row w-full px-6 items-center justify-between">
      <Pressable
        onPress={() => {
          router.back();
        }}
      >
        <Ionicons
          name="chevron-down"
          size={20}
          color="#EA1D2C"
          className="font-semibold"
        />
      </Pressable>

      <View className="flex flex-col items-center justify-center">
        <Text className="text-center font-semibold uppercase">Sacola</Text>
      </View>

      <Pressable>
        <Text
          className="text-center font-semibold"
          style={{ color: "#EA1D2C" }}
        >
          Limpar
        </Text>
      </Pressable>
    </View>
  );
}
