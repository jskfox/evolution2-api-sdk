import { AxiosInstance } from 'axios';
import { BaseControllerConfig, handleApiError, resolveInstance } from '../types/base';
import { Profile } from '../types/profile';

export interface PrivacySettings {
  readreceipts?: 'all' | 'none';
  profile?: 'all' | 'contacts' | 'contact_blacklist' | 'none';
  status?: 'all' | 'contacts' | 'contact_blacklist' | 'none';
  online?: 'all' | 'match_last_seen';
  last?: 'all' | 'contacts' | 'contact_blacklist' | 'none';
  groupadd?: 'all' | 'contacts' | 'contact_blacklist';
}

/**
 * Controller for managing profile settings
 * Controlador para gestionar configuración de perfil
 */
class InstanceProfileController {
  private http: AxiosInstance;
  private config: BaseControllerConfig;

  constructor(config: BaseControllerConfig) {
    this.http = config.http;
    this.config = config;
  }

  /** Fetch profile information / Obtener información de perfil */
  async fetchProfile(number: string, instanceName?: string): Promise<Profile> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post<Profile>(`/chat/fetchProfile/${instance}`, { number }, { params: { instance } });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Fetch business profile information / Obtener información de perfil empresarial */
  async fetchBusinessProfile(number: string, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post(`/chat/fetchBusinessProfile/${instance}`, { number }, { params: { instance } });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Update profile name / Actualizar nombre de perfil */
  async updateName(name: string, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post(`/chat/updateProfileName/${instance}`, { name }, { params: { instance } });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Update profile status / Actualizar estado de perfil */
  async updateStatus(status: string, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post(`/chat/updateProfileStatus/${instance}`, { status }, { params: { instance } });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Update profile picture / Actualizar foto de perfil */
  async updatePicture(pictureUrl: string, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post(`/chat/updateProfilePicture/${instance}`, { picture: pictureUrl }, { params: { instance } });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Remove profile picture / Eliminar foto de perfil */
  async removePicture(instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.delete(`/chat/removeProfilePicture/${instance}`, { params: { instance } });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Get privacy settings / Obtener configuración de privacidad */
  async getPrivacy(instanceName?: string): Promise<PrivacySettings> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.get<PrivacySettings>(`/chat/fetchPrivacySettings/${instance}`, { params: { instance } });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Update privacy settings / Actualizar configuración de privacidad */
  async updatePrivacy(settings: PrivacySettings, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post(`/chat/updatePrivacySettings/${instance}`, settings, { params: { instance } });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
}

export default InstanceProfileController;
