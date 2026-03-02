import axiosClient from "./axiosClient";

export const productsApi = {
  getAll: () => axiosClient.get("/products"),
  getById: (id: string | number) => axiosClient.get(`/products/${id}`),
};
