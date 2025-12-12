import { AxiosInstance } from 'axios';
import { BaseControllerConfig, handleApiError, resolveInstance } from '../types/base';
import { WebhookEvent } from '../types/settings';

export interface WebsocketConfig {
    enabled: boolean;
    events?: WebhookEvent[];
}

export interface WebsocketSettings {
    websocket: WebsocketConfig;
}

/**
 * Controller for managing Websocket settings
 * Controlador para gestionar la configuración de Websocket
 */
class WebsocketController {
    private http: AxiosInstance;
    private config: BaseControllerConfig;

    constructor(config: BaseControllerConfig) {
        this.http = config.http;
        this.config = config;
    }

    /** Set websocket configuration / Configurar websocket */
    async set(settings: WebsocketSettings, instanceName?: string): Promise<WebsocketSettings> {
        try {
            const instance = resolveInstance(instanceName, this.config);
            const response = await this.http.post<WebsocketSettings>("/websocket/set/:instance", settings, { params: { instance } });
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    /** Find websocket configuration / Obtener configuración de websocket */
    async find(instanceName?: string): Promise<WebsocketSettings> {
        try {
            const instance = resolveInstance(instanceName, this.config);
            const response = await this.http.get<WebsocketSettings>("/websocket/find/:instance", { params: { instance } });
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }
}

export default WebsocketController;
