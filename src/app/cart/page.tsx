import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import { Cart } from "@/src/components/cart";

import { CartItem } from "@/src/components/cart-preview";
import { FoodProps } from "@/src/components/food";
import { RestaurantProps } from "@/src/components/restaurant";

import { foodApi } from "@/src/repositories/food-repository";
import { restaurantApi } from "@/src/repositories/restaurant-repository";

export default function CartPage() {
  const [item, setItem] = useState<CartItem>();
  const [food, setFood] = useState<FoodProps>();
  const [restaurant, setRestaurant] = useState<RestaurantProps>();

  useEffect(() => {
    const getItem = async () => {
      const stored = await AsyncStorage.getItem("@food");

      if (stored) {
        setItem(JSON.parse(stored));
      }
    };

    getItem();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!item) return;

      try {
        const { data: foodData, status: foodStatus } = await foodApi.getFood(
          item.id
        );
        const { data: restaurantData, status: restaurantStatus } =
          await restaurantApi.getRestaurant(String(item.restaurantId));

        if (foodStatus === 200 && foodData) {
          setFood(foodData);
        }

        if (restaurantStatus === 200 && restaurantData) {
          setRestaurant(restaurantData);
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      }
    };

    fetchDetails();
  }, [item]);

  if (!item || !food || !restaurant) {
    return null;
  }

  return <Cart food={food} restaurant={restaurant} />;
}
