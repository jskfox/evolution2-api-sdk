import { AxiosInstance } from 'axios';
import { BaseControllerConfig, handleApiError } from '../types/base';
import { Instance, InstanceConnection, CreateInstanceParams } from '../types/instance';

class InstanceController {
  private http: AxiosInstance;

  constructor({ http }: BaseControllerConfig) {
    this.http = http;
  }

  async getAll(): Promise<Instance[]> {
    try {
      const response = await this.http.get<Instance[]>("/instance/getAll");
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async create(params: CreateInstanceParams): Promise<Instance> {
    try {
      const response = await this.http.post<Instance>("/instance/create", params);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async delete(instanceName: string): Promise<void> {
    try {
      await this.http.delete(`/instance/delete/:instance`, {
        params: { instance: instanceName }
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  async connect(instanceName: string): Promise<InstanceConnection> {
    try {
      const response = await this.http.get<InstanceConnection>("/instance/connect/:instance", {
        params: { instance: instanceName }
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async disconnect(instanceName: string): Promise<void> {
    try {
      await this.http.get("/instance/disconnect/:instance", {
        params: { instance: instanceName }
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  async logout(instanceName: string): Promise<void> {
    try {
      await this.http.get("/instance/logout/:instance", {
        params: { instance: instanceName }
      });
    } catch (error) {
      handleApiError(error);
    }
  }
}

export default InstanceController;
