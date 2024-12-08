import { AxiosInstance } from 'axios';
import { BaseControllerConfig, handleApiError } from '../types/base';
import { Profile, ProfileUpdate, ProfilePicture } from '../types/profile';

class InstanceProfileController {
  private http: AxiosInstance;

  constructor({ http }: BaseControllerConfig) {
    this.http = http;
  }

  
  

  async updatePicture(instanceName: string, pictureUrl: string): Promise<ProfilePicture> {
    try {
      const response = await this.http.post<ProfilePicture>(
        "/chat/updateProfilePicture/:instance",
        { url: pictureUrl },
        { params: { instance: instanceName } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async removePicture(instanceName: string): Promise<void> {
    try {
      await this.http.delete("/chat/removeProfilePicture/:instance", {
        params: { instance: instanceName }
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  async updateName(instanceName: string, name: string): Promise<any> {
    try {
      const response = await this.http.post(
        "/chat/updateProfileName/:instance", 
        { name }, 
        {
          params: {
            instance: instanceName
          }
        }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async updateStatus(instanceName: string, status: string): Promise<any> {
    try {
      const response = await this.http.post(
        "/chat/updateProfileStatus/:instance", 
        { status }, 
        {
          params: {
            instance: instanceName
          }
        }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async getPrivacy(instanceName: string): Promise<any> {
    try {
      const response = await this.http.get(
        "/chat/fetchPrivacySettings/:instance", 
        {
          params: {
            instance: instanceName
          }
        }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async updatePrivacy(instanceName: string, privacySettings: any): Promise<any> {
    try {
      const response = await this.http.put(
        "/chat/updatePrivacySettings/:instance", 
        { privacySettings }, 
        {
          params: {
            instance: instanceName
          }
        }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
}

export default InstanceProfileController;
