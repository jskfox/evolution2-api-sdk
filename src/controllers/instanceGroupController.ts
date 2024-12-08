import { AxiosInstance } from 'axios';
import { BaseControllerConfig, handleApiError } from '../types/base';
import { Group, CreateGroupParams, GroupParticipantAction } from '../types/group';

class InstanceGroupController {
  private http: AxiosInstance;

  constructor({ http }: BaseControllerConfig) {
    this.http = http;
  }

  async create(instanceName: string, params: CreateGroupParams): Promise<Group> {
    try {
      const response = await this.http.post<Group>(
        "/group/create/:instance",
        params,
        { params: { instance: instanceName } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async leave(instanceName: string, groupId: string): Promise<void> {
    try {
      await this.http.post(
        "/group/leave/:instance",
        { groupId },
        { params: { instance: instanceName } }
      );
    } catch (error) {
      handleApiError(error);
    }
  }

  async addParticipant(instanceName: string, params: GroupParticipantAction): Promise<void> {
    try {
      await this.http.post(
        "/group/addParticipant/:instance",
        params,
        { params: { instance: instanceName } }
      );
    } catch (error) {
      handleApiError(error);
    }
  }

  async removeParticipant(instanceName: string, params: GroupParticipantAction): Promise<void> {
    try {
      await this.http.post(
        "/group/removeParticipant/:instance",
        params,
        { params: { instance: instanceName } }
      );
    } catch (error) {
      handleApiError(error);
    }
  }

  async promoteParticipant(instanceName: string, params: GroupParticipantAction): Promise<void> {
    try {
      await this.http.post(
        "/group/promoteParticipant/:instance",
        params,
        { params: { instance: instanceName } }
      );
    } catch (error) {
      handleApiError(error);
    }
  }

  async demoteParticipant(instanceName: string, params: GroupParticipantAction): Promise<void> {
    try {
      await this.http.post(
        "/group/demoteParticipant/:instance",
        params,
        { params: { instance: instanceName } }
      );
    } catch (error) {
      handleApiError(error);
    }
  }
}

export default InstanceGroupController;
