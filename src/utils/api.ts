import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { LoginRequest, RegisterRequest, AuthResponse } from "../types/auth";
import { getToken } from "./auth";
import axios from "./axios";
import endPoints from "./endpoints";

type Option = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  payload?: any;
  withAuth?: boolean;
};

export const fetcher = async <T>(
  url: string,
  options: AxiosRequestConfig
): Promise<T> =>
  new Promise((resolve, reject) => {
    axios({
      url,
      ...options,
    })
      .then((response: AxiosResponse<T>) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error: AxiosError<T>) => {
        reject(error);
      });
  });

export const makeOptions = ({
  method = "GET",
  payload,
  withAuth,
}: Option): AxiosRequestConfig => {
  const { token } = getToken();
  const options: AxiosRequestConfig = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  if (token && withAuth) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  if (method === "POST" && payload) {
    options.data = payload;
  }

  return options;
};

export const loginApi = async (payload: LoginRequest) =>
  fetcher<AuthResponse>(
    endPoints.login(),
    makeOptions({
      method: "POST",
      payload,
    })
  );

export const registerApi = async (payload: RegisterRequest) =>
  fetcher<AuthResponse>(
    endPoints.register(),
    makeOptions({
      method: "POST",
      payload,
    })
  );

export const getCurrentuser = async () =>
  fetcher<AuthResponse>(
    endPoints.getCurrentUser(),
    makeOptions({
      method: "GET",
      withAuth: true,
    })
  );
