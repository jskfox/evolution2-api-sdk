import { AxiosInstance } from 'axios';
import createHttp from './http-common';
import { Evolution2Config } from './types';

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

    // Initialize controllers
    this.chat = new InstanceChatController(this.http);
    this.instance = new InstanceController(this.http);
    this.group = new InstanceGroupController(this.http);
    this.profile = new InstanceProfileController(this.http);
    this.settings = new InstanceSettingsController(this.http);
  }

  setApiKey(apiKey: string): void {
    this.config.headers = {
      ...this.config.headers,
      'apikey': apiKey
    };
    this.http.defaults.headers.common['apikey'] = apiKey;
  }

  setBaseURL(baseURL: string): void {
    this.config.baseURL = baseURL;
    this.http.defaults.baseURL = baseURL;
  }
}

export default Evolution2SDK;
export * from './types';
