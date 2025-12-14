import { AxiosInstance } from 'axios';
import { createHttp } from './http-common';
import { Evolution2Config } from './types';
import InstanceChatController from './controllers/instanceChatController';
import InstanceController from './controllers/instanceController';
import InstanceGroupController from './controllers/instanceGroupController';
import InstanceProfileController from './controllers/instanceProfileController';
import InstanceSettingsController from './controllers/instanceSettingsController';
import MessageController from './controllers/messageController';
import LabelController from './controllers/labelController';
import WebsocketController from './controllers/websocketController';
import { BaseControllerConfig } from './types/base';

/**
 * Extended configuration with instance name
 * Configuración extendida con nombre de instancia
 */
export interface Evolution2SDKConfig extends Evolution2Config {
  /** Default instance name / Nombre de instancia por defecto */
  instanceName?: string;
}

/**
 * Evolution API v2 SDK
 * SDK para Evolution API v2
 * 
 * @example
 * ```typescript
 * import { Evolution2SDK } from 'evolution2-api-sdk';
 * 
 * // With default instance / Con instancia por defecto
 * const evoApi = new Evolution2SDK({
 *   host: 'https://your-evolution-api.com',
 *   apiKey: 'your-api-key',
 *   instanceName: 'my-instance' // Optional default instance
 * });
 * 
 * // Uses default instance / Usa la instancia por defecto
 * await evoApi.message.sendText({ number: '5511999999999', text: 'Hello!' });
 * 
 * // Override instance for specific call / Sobrescribir instancia para una llamada específica
 * await evoApi.message.sendText({ number: '5511999999999', text: 'Hello!' }, 'other-instance');
 * 
 * // Change default instance / Cambiar instancia por defecto
 * evoApi.setInstance('another-instance');
 * ```
 */
class Evolution2SDK {
  private config: Evolution2Config;
  private http!: AxiosInstance;
  private _instanceName?: string;

  /** Chat operations controller / Controlador de operaciones de chat */
  public chat!: InstanceChatController;

  /** Instance management controller / Controlador de gestión de instancias */
  public instance!: InstanceController;

  /** Group management controller / Controlador de gestión de grupos */
  public group!: InstanceGroupController;

  /** Profile settings controller / Controlador de configuración de perfil */
  public profile!: InstanceProfileController;

  /** Instance settings controller / Controlador de configuración de instancia */
  public settings!: InstanceSettingsController;

  /** Message sending controller / Controlador de envío de mensajes */
  public message!: MessageController;

  /** Label management controller / Controlador de gestión de etiquetas */
  public label!: LabelController;

  /** Websocket configuration controller / Controlador de configuración de websocket */
  public websocket!: WebsocketController;


  constructor(config: Evolution2SDKConfig) {
    this._instanceName = config.instanceName;

    this.config = {
      baseURL: config.host || '',
      headers: {
        'apikey': config.apiKey || ''
      },
      ...config
    };

    this.http = createHttp(this.config);
    this._initControllers();
  }

  /**
   * Initialize all controllers with current config
   * Inicializar todos los controladores con la configuración actual
   */
  private _initControllers(): void {
    const controllerConfig: BaseControllerConfig = {
      http: this.http,
      getDefaultInstance: () => this._instanceName
    };

    this.chat = new InstanceChatController(controllerConfig);
    this.instance = new InstanceController(controllerConfig);
    this.group = new InstanceGroupController(controllerConfig);
    this.profile = new InstanceProfileController(controllerConfig);
    this.settings = new InstanceSettingsController(controllerConfig);
    this.message = new MessageController(controllerConfig);
    this.label = new LabelController(controllerConfig);
    this.websocket = new WebsocketController(controllerConfig);
  }

  /**
   * Get current default instance name
   * Obtener el nombre de instancia por defecto actual
   */
  get instanceName(): string | undefined {
    return this._instanceName;
  }

  /**
   * Set default instance name
   * Establecer el nombre de instancia por defecto
   */
  setInstance(instanceName: string): void {
    this._instanceName = instanceName;
  }

  /**
   * Update API key and reinitialize controllers
   * Actualizar API key y reinicializar controladores
   */
  setApiKey(apiKey: string): void {
    this.config.headers = {
      ...this.config.headers,
      'apikey': apiKey
    };
    this.http = createHttp(this.config);
    this._initControllers();
  }

  /**
   * Update base URL and reinitialize controllers
   * Actualizar URL base y reinicializar controladores
   */
  setBaseURL(baseURL: string): void {
    this.config.baseURL = baseURL;
    this.http = createHttp(this.config);
    this._initControllers();
  }
}

export default Evolution2SDK;
export { Evolution2SDK };
export * from './types';
export * from './types/message';
export * from './types/response';
export { normalizeBase64, isUrl, isBase64, RECOMMENDED_FORMATS, MAX_FILE_SIZES } from './utils/mediaHelpers';
