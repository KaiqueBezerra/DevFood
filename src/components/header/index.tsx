import { Feather, Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export function Header() {
  return (
    <View className="flex-row w-full items-center justify-between">
      <Pressable className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center invisible">
        <Ionicons name="menu" size={20} color="#121212" />
      </Pressable>

      <View className="flex flex-col items-center justify-center">
        <Text className="text-center text-sm text-slate-800">Localização</Text>

        <View className="flex-row items-center justify-center gap-1">
          <Feather name="map-pin" size={14} color="#EA1D2C" />
          <Text className="text-lg font-bold">São Paulo</Text>
        </View>
      </View>

      <Pressable className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
        <Feather name="bell" size={24} color="#121212" />
      </Pressable>
    </View>
  );
}
