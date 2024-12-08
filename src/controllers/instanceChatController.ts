import { AxiosInstance } from 'axios';
import { BaseControllerConfig, handleApiError } from '../types/base';
import { ChatContact, MessageOptions, WhatsappNumberStatus } from '../types/chat';

class InstanceChatController {
  private http: AxiosInstance;

  constructor({ http }: BaseControllerConfig) {
    this.http = http;
  }

  async getAll(instanceName: string): Promise<ChatContact[]> {
    try {
      const response = await this.http.get<ChatContact[]>("/chat/findChats/:instance", {
        params: { instance: instanceName }
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async hasWhatsapp(instanceName: string, numbers: string[]): Promise<WhatsappNumberStatus[]> {
    try {
      const response = await this.http.post<WhatsappNumberStatus[]>(
        "/chat/whatsappNumbers/:instance",
        { numbers },
        { params: { instance: instanceName } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async getContacts(instanceName: string, numbers: string[]): Promise<ChatContact[]> {
    try {
      const response = await this.http.post<ChatContact[]>(
        "/chat/findContacts/:instance",
        { numbers },
        { params: { instance: instanceName } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async sendMessage(instanceName: string, options: MessageOptions): Promise<any> {
    try {
      const response = await this.http.post(
        "/message/sendText/:instance",
        options,
        { params: { instance: instanceName } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
}

export default InstanceChatController;
