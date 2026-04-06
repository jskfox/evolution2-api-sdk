import { HttpClient } from '../http-common';
import { BaseControllerConfig, handleApiError, resolveInstance } from '../types/base';
import { Instance, CreateInstanceParams } from '../types/instance';
import { ConnectionStateResult, QRCodeResult, CreateInstanceResult, SuccessResult } from '../types/response';

export type PresenceStatus = 'available' | 'unavailable';


/**
 * Controller for managing WhatsApp instances
 * Controlador para gestionar instancias de WhatsApp
 */
class InstanceController {
  private http: HttpClient;
  private config: BaseControllerConfig;

  constructor(config: BaseControllerConfig) {
    this.http = config.http;
    this.config = config;
  }

  /** Fetch all instances / Obtener todas las instancias */
  async fetchAll(): Promise<Instance[]> {
    try {
      return await this.http.get<Instance[]>("/instance/fetchInstances");
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Create a new instance / Crear una nueva instancia */
  async create(params: CreateInstanceParams): Promise<Instance> {
    try {
      return await this.http.post<Instance>("/instance/create", params);
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Delete an instance / Eliminar una instancia */
  async delete(instanceName?: string): Promise<void> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      await this.http.delete(`/instance/delete/${instance}`, { instance });
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Connect and get QR code / Conectar y obtener código QR */
  async connect(instanceName?: string): Promise<QRCodeResult> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      return await this.http.get<QRCodeResult>(`/instance/connect/${instance}`, { instance });
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Get connection state / Obtener estado de conexión */
  async connectionState(instanceName?: string): Promise<ConnectionStateResult> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      return await this.http.get<ConnectionStateResult>(`/instance/connectionState/${instance}`, { instance });
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Set presence status (online/offline) / Establecer estado de presencia */
  async setPresence(presence: PresenceStatus, instanceName?: string): Promise<SuccessResult> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      return await this.http.post<SuccessResult>(`/instance/setPresence/${instance}`, { presence }, { instance });
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Logout from an instance / Cerrar sesión de una instancia */
  async logout(instanceName?: string): Promise<void> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      await this.http.delete(`/instance/logout/${instance}`, { instance });
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Restart an instance / Reiniciar una instancia */
  async restart(instanceName?: string): Promise<void> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      await this.http.post(`/instance/restart/${instance}`, {}, { instance });
    } catch (error) {
      handleApiError(error);
    }
  }
}

export default InstanceController;
