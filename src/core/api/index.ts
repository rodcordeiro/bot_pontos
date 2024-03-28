import axios, { type AxiosResponse } from 'axios';
import { Logger } from '../logger';

const api = axios.create({
  baseURL: 'https://raizes.rodrigocordeiro.com.br/api',
  responseType: 'json',
});

api.interceptors.response.use(
  async (res: AxiosResponse) => {
    Logger.debug(`[API] ${res.config.method} ${res.status} ${res.config.url}`);
    return await Promise.resolve(res);
  },
  async (res: AxiosResponse) => {
    Logger.debug(`[API] ${res.config.method} ${res.status} ${res.config.url}`);
    return await Promise.reject(res);
  },
);

export { api };
