import { AxiosInstance, AxiosResponse } from 'axios';

export interface BaseControllerConfig {
  http: AxiosInstance;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export type ApiResponsePromise<T = any> = Promise<ApiResponse<T>>;

export function handleApiError(error: any): never {
  throw error.response?.data || error.response || error;
}
