export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: "user" | "admin";
  createdAt: string;
  user: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
}
