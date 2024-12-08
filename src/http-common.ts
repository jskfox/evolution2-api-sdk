import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { Evolution2Config } from './types';

const createHttp = (config: Evolution2Config = {}): AxiosInstance => {
  const http = axios.create({
    headers: {
      'Content-type': 'application/json',
      ...(config.headers || {})
    },
    ...config
  });

  http.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const params = Object.entries(config.params || {});
      if (params.length > 0 && config.url) {
        config.url = config.url.replace(/:(\w+)/g, (_, key: string) => {
          const value = params.find(([k]) => k === key)?.[1];
          if (value) {
            delete config.params[key];
            return String(value);
          }
          return _;
        });
      }
      return config;
    },
    error => Promise.reject(error)
  );

  return http;
};

export default createHttp;
