import { useEffect, useState } from "react";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/product-api";
import { Product } from "../types/products";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch single product
  const fetchProductById = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      return await getProductById(id);
    } catch (err) {
      setError("Failed to fetch product");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Create product
  const addProduct = async (product: Partial<Product>) => {
    setLoading(true);
    setError(null);
    try {
      const newProduct = await createProduct(product);
      setProducts((prev) => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError("Failed to create product");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Update product
  const editProduct = async (id: number, product: Partial<Product>) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateProduct(id, product);
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      return updated;
    } catch (err) {
      setError("Failed to update product");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete product
  const removeProduct = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  // Auto fetch on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    addProduct,
    editProduct,
    removeProduct,
  };
};
