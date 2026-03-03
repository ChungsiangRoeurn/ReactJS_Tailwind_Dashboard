import { Product } from "../types/products";
import api from "./axiosInstance";

export const getAllProducts = async (): Promise<Product> => {
  const response = await api.get("/api/product");
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get(`/api/product/${id}`);
  return response.data;
};

export const createProduct = async (
  product: Partial<Product[]>,
): Promise<Product[]> => {
  const response = await api.post("/api/product", product);
  return response.data;
};

export const deleteProduct = async (
  id: number,
): Promise<{ message: string }> => {
  const response = await api.delete(`/api/product/${id}`);
  return response.data;
};

export const updateProduct = async (
  id: number,
  product: Partial<Product>,
): Promise<Product> => {
  const response = await api.put(`/api/product/${id}`, product);
  return response.data;
};
