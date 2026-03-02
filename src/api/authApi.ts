import axiosClient from "./axiosClient";

export type LoginData = Record<string, unknown>;

export const authApi = {
  login: (data: LoginData) => axiosClient.post("/auth/login", data),
};
