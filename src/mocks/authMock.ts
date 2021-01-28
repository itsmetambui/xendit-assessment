import { AxiosInstance } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { AuthResponse } from "../types/auth";
import { User } from "../types/user";
import axios from "../utils/axios/axios";

const userData: User = {
  id: "12345",
  email: "itsmetambui@gmail.com",
};

const authData: AuthResponse = {
  user: userData,
  token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MTE4MjY5OTYsImV4cCI6MTY0MzM2Mjk5NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiaXRzbWV0YW1idWlAZ21haWwuY29tIiwiRW1haWwiOiJpdHNtZXRhbWJ1aUBnbWFpbC5jb20ifQ.Gc5K13M6TN3psHij-pz248IP0JeQ6CkT-iYAtLfA8z0",
};

export const applyMocks = (instance: AxiosInstance = axios) => {
  const mock = new AxiosMockAdapter(instance, {
    delayResponse: 0,
  });

  mock.onPost("/api/auth/sign-in").reply((config) => {
    const { email, password } = JSON.parse(config.data);

    if (email === "hello@xendit.com" && password === "unsafepassword") {
      return [200, authData];
    }

    return [401, { message: "Please check your email and password" }];
  });

  mock.onPost("/api/auth/sign-up").reply(() => {
    return [200, authData];
  });

  mock.onGet("/api/users/me").reply((config) => {
    if (config.headers["Authorization"] === `Bearer ${authData.token}`) {
      return [200, authData];
    }
    return [403, { message: "Unauthorized" }];
  });

  return mock;
};
