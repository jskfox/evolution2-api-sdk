import { AxiosInstance, AxiosResponse } from 'axios';

export interface BaseControllerConfig {
  http: AxiosInstance;
  /** Default instance name to use when not specified / Nombre de instancia por defecto */
  defaultInstance?: string;
  /** Function to get the current default instance / Función para obtener la instancia por defecto actual */
  getDefaultInstance?: () => string | undefined;
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

/**
 * Resolves the instance name, using the provided one or falling back to default
 * Resuelve el nombre de la instancia, usando el proporcionado o el por defecto
 */
export function resolveInstance(
  provided: string | undefined,
  config: BaseControllerConfig
): string {
  const instance = provided || config.getDefaultInstance?.() || config.defaultInstance;
  if (!instance) {
    throw new Error('Instance name is required. Set it in constructor or pass it to the method. / El nombre de la instancia es requerido. Configúralo en el constructor o pásalo al método.');
  }
  return instance;
}
