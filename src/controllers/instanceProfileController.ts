import { AxiosInstance } from 'axios';
import { BaseControllerConfig, handleApiError } from '../types/base';
import { Profile, ProfileUpdate, ProfilePicture } from '../types/profile';

class InstanceProfileController {
  private http: AxiosInstance;

  constructor({ http }: BaseControllerConfig) {
    this.http = http;
  }

  async get(instanceName: string): Promise<Profile> {
    try {
      const response = await this.http.get<Profile>("/profile/get/:instance", {
        params: { instance: instanceName }
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async update(instanceName: string, profile: ProfileUpdate): Promise<Profile> {
    try {
      const response = await this.http.post<Profile>(
        "/profile/update/:instance",
        profile,
        { params: { instance: instanceName } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async getPicture(instanceName: string): Promise<ProfilePicture> {
    try {
      const response = await this.http.get<ProfilePicture>("/profile/picture/:instance", {
        params: { instance: instanceName }
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async updatePicture(instanceName: string, pictureUrl: string): Promise<ProfilePicture> {
    try {
      const response = await this.http.post<ProfilePicture>(
        "/profile/picture/:instance",
        { url: pictureUrl },
        { params: { instance: instanceName } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async deletePicture(instanceName: string): Promise<void> {
    try {
      await this.http.delete("/profile/picture/:instance", {
        params: { instance: instanceName }
      });
    } catch (error) {
      handleApiError(error);
    }
  }
}

export default InstanceProfileController;
