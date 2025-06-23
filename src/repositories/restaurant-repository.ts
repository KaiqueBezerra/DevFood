import { api } from "../services/api/api";

export const restaurantApi = {
  async getRestaurants() {
    try {
      const { data, status } = await api.get("restaurants");
      return { data, status };
    } catch (error) {
      console.error("Erro ao buscar restaurantes:", error);
      return { data: null, status: 500 };
    }
  },

  async getRestaurant(id: string) {
    try {
      const { data, status } = await api.get(`restaurants/${id}`);
      return { data, status };
    } catch (error) {
      console.error("Erro ao buscar restaurantes:", error);
      return { data: null, status: 500 };
    }
  },
};
