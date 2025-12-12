import { AxiosInstance } from 'axios';
import { BaseControllerConfig, handleApiError, resolveInstance } from '../types/base';
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

/**
 * Controller for managing instance settings
 * Controlador para gestionar configuración de instancia
 */
class InstanceSettingsController {
  private http: AxiosInstance;
  private config: BaseControllerConfig;

  constructor(config: BaseControllerConfig) {
    this.http = config.http;
    this.config = config;
  }

  /** Find settings / Obtener configuración */
  async findOptions(instanceName?: string): Promise<SettingsOptions> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.get("/settings/find/:instance", { params: { instance } });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Set settings / Establecer configuración */
  async setOptions(data: SettingsOptions, instanceName?: string): Promise<SettingsOptions> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post("/settings/set/:instance", data, { params: { instance } });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Find webhook / Obtener webhook */
  async findWebhook(instanceName?: string): Promise<WebhookSettings> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.get("/webhook/find/:instance", { params: { instance } });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Set webhook / Establecer webhook */
  async setWebhook(data: WebhookSettings, instanceName?: string): Promise<WebhookSettings> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post("/webhook/set/:instance", data, { params: { instance } });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Find websocket / Obtener websocket */
  async findWebsocket(instanceName?: string): Promise<WebsocketSettings> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.get("/websocket/find/:instance", { params: { instance } });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Set websocket / Establecer websocket */
  async setWebsocket(data: WebsocketSettings, instanceName?: string): Promise<WebsocketSettings> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post("/websocket/set/:instance", data, { params: { instance } });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Find RabbitMQ / Obtener RabbitMQ */
  async findRabbitmq(instanceName?: string): Promise<RabbitmqSettings> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.get("/rabbitmq/find/:instance", { params: { instance } });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Set RabbitMQ / Establecer RabbitMQ */
  async setRabbitmq(data: RabbitmqSettings, instanceName?: string): Promise<RabbitmqSettings> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post("/rabbitmq/set/:instance", data, { params: { instance } });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Find Chatwoot / Obtener Chatwoot */
  async findChatwoot(instanceName?: string): Promise<ChatwootSettings> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.get("/chatwoot/find/:instance", { params: { instance } });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Set Chatwoot / Establecer Chatwoot */
  async setChatwoot(data: ChatwootSettings, instanceName?: string): Promise<ChatwootSettings> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post("/chatwoot/set/:instance", data, { params: { instance } });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Find Typebot / Obtener Typebot */
  async findTypebot(instanceName?: string): Promise<TypebotSettings> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.get("/typebot/find/:instance", { params: { instance } });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Set Typebot / Establecer Typebot */
  async setTypebot(data: TypebotSettings, instanceName?: string): Promise<TypebotSettings> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.post("/typebot/set/:instance", data, { params: { instance } });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /** Change Typebot status / Cambiar estado de Typebot */
  async changeTypebotStatus(data: TypebotStatusChange, instanceName?: string): Promise<TypebotSettings> {
    try {
      const instance = resolveInstance(instanceName, this.config);
      const response = await this.http.put("/typebot/changeStatus/:instance", data, { params: { instance } });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
}

export default InstanceSettingsController;
