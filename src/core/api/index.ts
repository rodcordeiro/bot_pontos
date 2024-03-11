import axios, { AxiosResponse } from "axios";
import { Logger } from "../logger";

const api = axios.create({
  baseURL: 'https://raizes.rodrigocordeiro.com.br/api',
  responseType: 'json',
});

api.interceptors.response.use(
  (res: AxiosResponse) => {
    Logger.debug(`[API] ${res.config.method} ${res.status} ${res.config.url}`);
    return Promise.resolve(res);
  },
  (res: AxiosResponse) => {
    Logger.debug(`[API] ${res.config.method} ${res.status} ${res.config.url}`);
    return Promise.reject(res);
  }
);

export { api };
