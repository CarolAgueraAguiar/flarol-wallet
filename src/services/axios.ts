import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { env } from "../config/env";
import { getSessionToken } from "../utils/token";

const addTokenInRequest = async (config: InternalAxiosRequestConfig) => {
  const userInfo = await getSessionToken();

  if (config?.headers && userInfo) {
    config.headers["Authorization"] = `Bearer ${userInfo}`;
  }
  return config;
};

export const axiosFlarol: AxiosInstance = axios.create({
  baseURL: env.baseUrl,
});

axiosFlarol.interceptors.request.use(addTokenInRequest);
