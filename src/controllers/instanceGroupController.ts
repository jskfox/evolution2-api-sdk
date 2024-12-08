import { AxiosInstance } from 'axios';
import { BaseControllerConfig, handleApiError } from '../types/base';
import { Group } from '../types/group';

class InstanceGroupController {
  private http: AxiosInstance;

  constructor({ http }: BaseControllerConfig) {
    this.http = http;
  }

  async getAll(instanceName: string): Promise<Group[]> {
    try {
      const response = await this.http.get<Group[]>("/group/fetchAllGroups/:instance/?getParticipants=false", {
        params: { instance: instanceName }
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }


  async getById(instanceName: string, id: string): Promise<Group> {
    try {
      const response = await this.http.get<Group>("/group/findGroupInfos/:instance/?groupJid=:id", {
        params: { instance: instanceName, id }
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async updateParticipant(instanceName: string, groupId: string, action: string, participants: string[]): Promise<void> {
    try {
      await this.http.put(
        "/group/updateParticipant/:instance/",
        { action, participants },
        { 
          params: { 
            instance: instanceName, 
            groupJid: groupId 
          } 
        }
      );
    } catch (error) {
      handleApiError(error);
    }
  }
}

export default InstanceGroupController;
