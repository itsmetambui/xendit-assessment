import axios from "axios";
import { QueryCache } from "react-query";
import { clearAuthKeys } from "../auth";
import { API_URL } from "../../types/env";

const UNAUTHORIZED = 401;

const queryCache = new QueryCache({
  onError: (error) => {
    console.log(error);
  },
});

const axiosIntance = axios.create({
  baseURL: API_URL,
  validateStatus: (status) => status < 500,
});

axiosIntance.interceptors.request.use((request) => {
  console.info("Starting Request", JSON.stringify(request, null, 2));
  return request;
});

axiosIntance.interceptors.response.use(
  (response) => {
    console.info("Response:", JSON.stringify(response, null, 2));
    return response;
  },
  async (error) => {
    console.error("Response error:", JSON.stringify(error, null, 2));
    const { status } = error.response || {};
    if (status === UNAUTHORIZED) {
      queryCache.clear();
      clearAuthKeys();
      window.location.assign(window.location.toString());
      return Promise.reject({ message: "Please re-authenticate." });
    }
    return Promise.reject(error);
  }
);

export default axiosIntance;
