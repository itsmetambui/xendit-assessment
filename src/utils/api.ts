import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import MockAdapter from "axios-mock-adapter/types";
import { LoginRequest, RegisterRequest, AuthResponse } from "../types/auth";
import { University } from "../types/university";
import { getToken } from "./auth";
import { applyMocks } from "./axios/applyMocks";
import axios from "./axios/axios";
import hippoAxios from "./axios/hippoAxios";
import endPoints from "./endpoints";

type Option = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  payload?: any;
  withAuth?: boolean;
};

let mock: MockAdapter;

export const fetcher = async <T>({
  url,
  options,
  withMock = true,
  instance = axios,
}: {
  url: string;
  options: AxiosRequestConfig;
  withMock?: boolean;
  instance?: AxiosInstance;
}): Promise<T> =>
  new Promise((resolve, reject) => {
    if (withMock) {
      mock = applyMocks();
    } else {
      mock.restore();
    }

    instance({
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
  fetcher<AuthResponse>({
    url: endPoints.login(),
    options: makeOptions({
      method: "POST",
      payload,
    }),
  });

export const registerApi = async (payload: RegisterRequest) =>
  fetcher<AuthResponse>({
    url: endPoints.register(),
    options: makeOptions({
      method: "POST",
      payload,
    }),
  });

export const getCurrentuser = async () =>
  fetcher<AuthResponse>({
    url: endPoints.getCurrentUser(),
    options: makeOptions({
      method: "GET",
      withAuth: true,
    }),
  });

export const searchUniversities = async (name: string, country: string) =>
  fetcher<University[]>({
    url: endPoints.searchUniversities(name, country),
    options: makeOptions({
      method: "GET",
    }),
    withMock: false,
    instance: hippoAxios,
  });
