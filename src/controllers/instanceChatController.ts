import { AxiosInstance } from 'axios';
import { BaseControllerConfig, handleApiError, resolveInstance } from '../types/base';
import { ChatContact, WhatsappNumberStatus, MessageKey } from '../types/chat';
import { ProfilePictureResult, MediaBase64Result, MessageSearchResult, SuccessResult } from '../types/response';

/**
 * Options for marking messages as read
 */
export interface ReadMessageOptions {
  readMessages: Array<{
    remoteJid: string;
    fromMe: boolean;
    id: string;
  }>;
}

/**
 * Options for archiving a chat
 */
export interface ArchiveChatOptions {
  lastMessage: { key: MessageKey };
  chat: string;
  archive: boolean;
}

/**
 * Options for marking chat as unread
 */
export interface MarkChatUnreadOptions {
  lastMessage: { key: MessageKey };
  chat: string;
}

/**
 * Options for deleting a message
 */
export interface DeleteMessageOptions {
  id: string;
  remoteJid: string;
  fromMe: boolean;
  participant?: string;
}

/**
 * Options for updating a message
 */
export interface UpdateMessageOptions {
  number: string;
  key: MessageKey;
  text: string;
}

/**
 * Options for sending presence
 */
export interface SendPresenceOptions {
  number: string;
  delay?: number;
  presence: 'composing' | 'recording' | 'paused';
}

/**
 * Options for blocking/unblocking
 */
export interface UpdateBlockStatusOptions {
  number: string;
  status: 'block' | 'unblock';
}

/**
 * Options for getting base64 from media
 */
export interface GetBase64Options {
  message: { key: { id: string } };
  convertToMp4?: boolean;
}

/**
 * Options for finding messages
 */
export interface FindMessagesOptions {
  where?: { key?: { remoteJid?: string; id?: string } };
  page?: number;
  offset?: number;
}

/**
 * Options for finding contacts
 */
export interface FindContactsOptions {
  where?: { id?: string };
}

/**
 * Controller for chat operations
 * Controlador para operaciones de chat
 */
class InstanceChatController {
  private http: AxiosInstance;
  private config: BaseControllerConfig;

  constructor(config: BaseControllerConfig) {
    this.http = config.http;
    this.config = config;
  }

  /**
   * Find all chats / Encontrar todos los chats
   */
  async findChats(instanceName?: string): Promise<ChatContact[]> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post<ChatContact[]>("/chat/findChats/:instance", {}, {
        params: { instance }
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /**
   * Check if numbers have WhatsApp / Verificar si números tienen WhatsApp
   */
  async hasWhatsapp(numbers: string[], instanceName?: string): Promise<WhatsappNumberStatus[]> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post<WhatsappNumberStatus[]>(
        "/chat/whatsappNumbers/:instance",
        { numbers },
        { params: { instance } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /**
   * Find contacts / Buscar contactos
   */
  async findContacts(options: FindContactsOptions = {}, instanceName?: string): Promise<ChatContact[]> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post<ChatContact[]>(
        "/chat/findContacts/:instance",
        options,
        { params: { instance } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /**
   * Mark messages as read / Marcar mensajes como leídos
   */
  async markAsRead(options: ReadMessageOptions, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post(
        "/chat/markMessageAsRead/:instance",
        options,
        { params: { instance } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /**
   * Mark chat as unread / Marcar chat como no leído
   */
  async markChatUnread(options: MarkChatUnreadOptions, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post(
        "/chat/markChatUnread/:instance",
        options,
        { params: { instance } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /**
   * Archive or unarchive a chat / Archivar o desarchivar un chat
   */
  async archiveChat(options: ArchiveChatOptions, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post(
        "/chat/archiveChat/:instance",
        options,
        { params: { instance } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /**
   * Delete message for everyone / Eliminar mensaje para todos
   */
  async deleteMessage(options: DeleteMessageOptions, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.delete(
        "/chat/deleteMessageForEveryone/:instance",
        { params: { instance }, data: options }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /**
   * Update a message / Actualizar un mensaje
   */
  async updateMessage(options: UpdateMessageOptions, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post(
        "/chat/updateMessage/:instance",
        options,
        { params: { instance } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /**
   * Send presence (typing, recording) / Enviar presencia (escribiendo, grabando)
   */
  async sendPresence(options: SendPresenceOptions, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post(
        "/chat/sendPresence/:instance",
        options,
        { params: { instance } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /**
   * Block or unblock a number / Bloquear o desbloquear un número
   */
  async updateBlockStatus(options: UpdateBlockStatusOptions, instanceName?: string): Promise<any> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post(
        "/chat/updateBlockStatus/:instance",
        options,
        { params: { instance } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /**
   * Fetch profile picture URL / Obtener URL de foto de perfil
   */
  async fetchProfilePictureUrl(number: string, instanceName?: string): Promise<{ profilePictureUrl: string }> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post(
        "/chat/fetchProfilePictureUrl/:instance",
        { number },
        { params: { instance } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /**
   * Get base64 from media message / Obtener base64 de mensaje multimedia
   */
  async getBase64FromMedia(options: GetBase64Options, instanceName?: string): Promise<{ base64: string; mimetype: string }> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post(
        "/chat/getBase64FromMediaMessage/:instance",
        options,
        { params: { instance } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /**
   * Find messages / Buscar mensajes
   */
  async findMessages(options: FindMessagesOptions = {}, instanceName?: string): Promise<any[]> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post(
        "/chat/findMessages/:instance",
        options,
        { params: { instance } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /**
   * Find status messages / Buscar mensajes de estado
   */
  async findStatusMessage(options: FindMessagesOptions = {}, instanceName?: string): Promise<any[]> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post(
        "/chat/findStatusMessage/:instance",
        options,
        { params: { instance } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
}

export default InstanceChatController;
