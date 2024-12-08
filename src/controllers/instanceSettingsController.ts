import { AxiosInstance } from 'axios';
import { BaseControllerConfig, handleApiError } from '../types/base';
import { 
  SettingsOptions, 
  WebhookSettings, 
  RabbitmqSettings, 
  TypebotSettings, 
  TypebotStatusChange 
} from '../types/settings';

interface WebsocketSettings {
  enabled: boolean;
  events?: string[];
}

interface ChatwootSettings {
  enabled: boolean;
  accountId?: string;
  token?: string;
  url?: string;
  signMsg?: boolean;
  reopenConversation?: boolean;
  conversationPending?: boolean;
  nameInbox?: string;
  mergeBrazilContacts?: boolean;
  importContacts?: boolean;
  importMessages?: boolean;
  daysLimitImportMessages?: number;
  signDelimiter?: string;
  autoCreate?: boolean;
  organization?: string;
  logo?: string;
  ignoreJids?: string[];
}

class InstanceSettingsController {
  private http: AxiosInstance;

  constructor({ http }: BaseControllerConfig) {
    this.http = http;
  }


  async findOptions(instanceName: string): Promise<SettingsOptions> {
    try {
      const response = await this.http.get(
        "/settings/find/:instance", 
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
  
  async setOptions(instanceName: string, data: SettingsOptions): Promise<SettingsOptions> {
    try {
      const response = await this.http.post(
        "/settings/set/:instance", 
        data, 
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

  async findWebhook(instanceName: string): Promise<WebhookSettings> {
    try {
      const response = await this.http.get("/webhook/find/:instance", {
        params: { instance: instanceName }
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async setWebhook(instanceName: string, data: WebhookSettings): Promise<WebhookSettings> {
    try {
      const response = await this.http.post(
        "/webhook/set/:instance",
        data,
        { params: { instance: instanceName } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async findWebsocket(instanceName: string): Promise<WebsocketSettings> {
    try {
      const response = await this.http.get("/websocket/find/:instance", {
        params: { instance: instanceName }
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async setWebsocket(instanceName: string, data: WebsocketSettings): Promise<WebsocketSettings> {
    try {
      const response = await this.http.post(
        "/websocket/set/:instance",
        data,
        { params: { instance: instanceName } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async findRabbitmq(instanceName: string): Promise<RabbitmqSettings> {
    try {
      const response = await this.http.get("/rabbitmq/find/:instance", {
        params: { instance: instanceName }
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async setRabbitmq(instanceName: string, data: RabbitmqSettings): Promise<RabbitmqSettings> {
    try {
      const response = await this.http.post(
        "/rabbitmq/set/:instance",
        data,
        { params: { instance: instanceName } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async findChatwoot(instanceName: string): Promise<ChatwootSettings> {
    try {
      const response = await this.http.get("/chatwoot/find/:instance", {
        params: { instance: instanceName }
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async setChatwoot(instanceName: string, data: ChatwootSettings): Promise<ChatwootSettings> {
    try {
      const response = await this.http.post(
        "/chatwoot/set/:instance",
        data,
        { params: { instance: instanceName } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async findTypebot(instanceName: string): Promise<TypebotSettings> {
    try {
      const response = await this.http.get("/typebot/find/:instance", {
        params: { instance: instanceName }
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async setTypebot(instanceName: string, data: TypebotSettings): Promise<TypebotSettings> {
    try {
      const response = await this.http.post(
        "/typebot/set/:instance",
        data,
        { params: { instance: instanceName } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async changeTypebotStatus(instanceName: string, data: TypebotStatusChange): Promise<TypebotSettings> {
    try {
      const response = await this.http.put(
        "/typebot/changeStatus/:instance",
        data,
        { params: { instance: instanceName } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
}

export default InstanceSettingsController;
