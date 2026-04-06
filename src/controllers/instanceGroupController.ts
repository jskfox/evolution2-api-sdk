import { HttpClient } from '../http-common';
import { BaseControllerConfig, handleApiError, resolveInstance } from '../types/base';
import { GroupOptions } from '../types/group';
import { CreateGroupResult, InviteCodeResult, InviteInfoResult, UpdateParticipantResult, SuccessResult } from '../types/response';

export interface CreateGroupOptions {
  subject: string;
  description?: string;
  participants: string[];
}

export interface UpdateParticipantOptions {
  action: 'add' | 'remove' | 'promote' | 'demote';
  participants: string[];
}

export interface UpdateGroupSettingOptions {
  action: 'announcement' | 'not_announcement' | 'locked' | 'unlocked';
}

export interface SendInviteOptions {
  groupJid: string;
  description: string;
  numbers: string[];
}

/**
 * Controller for managing WhatsApp groups
 * Controlador para gestionar grupos de WhatsApp
 */
class InstanceGroupController {
  private http: HttpClient;
  private config: BaseControllerConfig;

  constructor(config: BaseControllerConfig) {
    this.http = config.http;
    this.config = config;
  }

  /** Fetch all groups / Obtener todos los grupos */
  async fetchAll(getParticipants: boolean = false, instanceName?: string): Promise<GroupOptions[]> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      return await this.http.get<GroupOptions[]>(`/group/fetchAllGroups/${instance}`, {
        instance,
        getParticipants: getParticipants.toString()
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Find group by JID / Buscar grupo por JID */
  async findById(groupJid: string, instanceName?: string): Promise<GroupOptions> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      return await this.http.get<GroupOptions>(`/group/findGroupInfos/${instance}`, {
        instance,
        groupJid
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Create a new group / Crear un nuevo grupo */
  async create(options: CreateGroupOptions, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      return await this.http.post(`/group/create/${instance}`, options, { instance });
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Update group picture / Actualizar foto del grupo */
  async updatePicture(groupJid: string, imageUrl: string, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      return await this.http.post(`/group/updateGroupPicture/${instance}`, { image: imageUrl }, { instance, groupJid });
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Update group subject (name) / Actualizar nombre del grupo */
  async updateSubject(groupJid: string, subject: string, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      return await this.http.post(`/group/updateGroupSubject/${instance}`, { subject }, { instance, groupJid });
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Update group description / Actualizar descripción del grupo */
  async updateDescription(groupJid: string, description: string, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      return await this.http.post(`/group/updateGroupDescription/${instance}`, { description }, { instance, groupJid });
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Fetch group invite code / Obtener código de invitación del grupo */
  async fetchInviteCode(groupJid: string, instanceName?: string): Promise<{ inviteCode: string }> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      return await this.http.get(`/group/inviteCode/${instance}`, { instance, groupJid });
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Revoke group invite code / Revocar código de invitación del grupo */
  async revokeInviteCode(groupJid: string, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      return await this.http.post(`/group/revokeInviteCode/${instance}`, {}, { instance, groupJid });
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Send group invite to numbers / Enviar invitación de grupo a números */
  async sendInvite(options: SendInviteOptions, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      return await this.http.post(`/group/sendInvite/${instance}`, options, { instance });
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Find group by invite code / Buscar grupo por código de invitación */
  async findByInviteCode(inviteCode: string, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      return await this.http.get(`/group/inviteInfo/${instance}`, { instance, inviteCode });
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Find group participants / Buscar participantes del grupo */
  async findParticipants(groupJid: string, instanceName?: string): Promise<any[]> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      return await this.http.get(`/group/participants/${instance}`, { instance, groupJid });
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Update group participants / Actualizar participantes del grupo */
  async updateParticipant(groupJid: string, options: UpdateParticipantOptions, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      return await this.http.post(`/group/updateParticipant/${instance}`, options, { instance, groupJid });
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Update group settings / Actualizar configuración del grupo */
  async updateSetting(groupJid: string, options: UpdateGroupSettingOptions, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      return await this.http.post(`/group/updateSetting/${instance}`, options, { instance, groupJid });
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Toggle ephemeral messages / Alternar mensajes efímeros */
  async toggleEphemeral(groupJid: string, expiration: number, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      return await this.http.post(`/group/toggleEphemeral/${instance}`, { expiration }, { instance, groupJid });
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Leave a group / Salir de un grupo */
  async leave(groupJid: string, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      return await this.http.delete(`/group/leaveGroup/${instance}`, { instance, groupJid });
    } catch (error) {
      handleApiError(error);
    }
  }
}

export default InstanceGroupController;
