import axiosClient from "./axiosClient";

export const productsApi = {
  getAll: () => axiosClient.get("/products"),
  getById: (id) => axiosClient.get(`/products/${id}`),
};
