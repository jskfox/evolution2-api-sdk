import { AxiosInstance } from 'axios';
import { BaseControllerConfig, handleApiError } from '../types/base';
import { Settings, SettingsUpdate } from '../types/settings';

interface WebhookSettings {
  url: string;
  enabled: boolean;
  events?: string[];
}

interface WebsocketSettings {
  enabled: boolean;
  events?: string[];
}

interface RabbitmqSettings {
  enabled: boolean;
  host?: string;
  port?: number;
  user?: string;
  password?: string;
}

interface ChatwootSettings {
  enabled: boolean;
  account_id?: string;
  token?: string;
  url?: string;
  sign_msg?: boolean;
  name_inbox?: string;
}

interface TypebotSettings {
  enabled: boolean;
  url?: string;
  typebot?: string;
  expire?: number;
  keyword_finish?: string;
}

class InstanceSettingsController {
  private http: AxiosInstance;

  constructor({ http }: BaseControllerConfig) {
    this.http = http;
  }

  async get(instanceName: string): Promise<Settings> {
    try {
      const response = await this.http.get<Settings>("/settings/get/:instance", {
        params: { instance: instanceName }
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  async update(instanceName: string, settings: SettingsUpdate): Promise<Settings> {
    try {
      const response = await this.http.post<Settings>(
        "/settings/update/:instance",
        settings,
        { params: { instance: instanceName } }
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

  async changeTypebotStatus(instanceName: string, data: { enabled: boolean }): Promise<TypebotSettings> {
    try {
      const response = await this.http.put(
        "/typebot/status/:instance",
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
