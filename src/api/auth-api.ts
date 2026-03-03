import api from "./axiosInstance";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "../types/auth";

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/api/auth/login", credentials);
  return response.data;
};

export const registerUser = async (
  credentials: RegisterCredentials,
): Promise<AuthResponse> => {
  const response = await api.post("/api/auth/register", credentials);
  return response.data;
};
