import { AxiosInstance } from 'axios';
import createHttp from './http-common';
import { Evolution2Config } from './types';
import { BaseControllerConfig } from './types/base';

import InstanceChatController from './controllers/instanceChatController';
import InstanceController from './controllers/instanceController';
import InstanceGroupController from './controllers/instanceGroupController';
import InstanceProfileController from './controllers/instanceProfileController';
import InstanceSettingsController from './controllers/instanceSettingsController';

class Evolution2SDK {
  private config: Evolution2Config;
  private http: AxiosInstance;

  public chat: InstanceChatController;
  public instance: InstanceController;
  public group: InstanceGroupController;
  public profile: InstanceProfileController;
  public settings: InstanceSettingsController;

  constructor(config: Evolution2Config) {
    this.config = {
      baseURL: config.host || '',
      headers: {
        'apikey': config.apiKey || ''
      },
      ...config
    };

    this.http = createHttp(this.config);

    const controllerConfig: BaseControllerConfig = { http: this.http };

    // Initialize controllers
    this.chat = new InstanceChatController(controllerConfig);
    this.instance = new InstanceController(controllerConfig);
    this.group = new InstanceGroupController(controllerConfig);
    this.profile = new InstanceProfileController(controllerConfig);
    this.settings = new InstanceSettingsController(controllerConfig);
  }

  setApiKey(apiKey: string): void {
    this.config.headers = {
      ...this.config.headers,
      'apikey': apiKey
    };
    this.http = createHttp(this.config);
    
    const controllerConfig: BaseControllerConfig = { http: this.http };
    
    // Reinitialize controllers with new http instance
    this.chat = new InstanceChatController(controllerConfig);
    this.instance = new InstanceController(controllerConfig);
    this.group = new InstanceGroupController(controllerConfig);
    this.profile = new InstanceProfileController(controllerConfig);
    this.settings = new InstanceSettingsController(controllerConfig);
  }

  setBaseURL(baseURL: string): void {
    this.config.baseURL = baseURL;
    this.http = createHttp(this.config);
    
    const controllerConfig: BaseControllerConfig = { http: this.http };
    
    // Reinitialize controllers with new http instance
    this.chat = new InstanceChatController(controllerConfig);
    this.instance = new InstanceController(controllerConfig);
    this.group = new InstanceGroupController(controllerConfig);
    this.profile = new InstanceProfileController(controllerConfig);
    this.settings = new InstanceSettingsController(controllerConfig);
  }
}

export default Evolution2SDK;
export * from './types';
