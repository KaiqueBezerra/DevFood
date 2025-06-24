import { api } from "../services/api/api";

export const foodApi = {
  async getFoods() {
    try {
      const { data, status } = await api.get("foods");
      return { data, status };
    } catch (error) {
      console.error("Erro ao buscar refeições:", error);
      return { data: null, status: 500 };
    }
  },

  async getFood(id: string) {
    try {
      const { data, status } = await api.get(`foods/${id}`);
      return { data, status };
    } catch (error) {
      console.error("Erro ao buscar refeições:", error);
      return { data: null, status: 500 };
    }
  },

  async getFoodsByRestaurant({ id }: { id: string }) {
    try {
      const { data, status } = await api.get(`foods?restaurantId=${id}`);
      return { data, status };
    } catch (error) {
      console.error("Erro ao buscar refeições:", error);
      return { data: null, status: 500 };
    }
  },

  async getFoodsBySearch(query: string) {
    try {
      const { data, status } = await api.get(`/foods?name=${query}`);
      return { data, status };
    } catch (error) {
      console.error("Erro ao buscar refeições:", error);
      return { data: null, status: 500 };
    }
  },
};
