import { User } from "./user";

export type LoginRequest = {
  email: string;
  password: string;
  remember?: boolean;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};
