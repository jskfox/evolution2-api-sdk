import axios from 'axios';

class Evolution2SDK {
  constructor(config) {
    this.config = {
      baseURL: config.host || '',
      apiKey: config.apiKey || '',
      ...config
    };

    this.http = axios.create({
      baseURL: this.config.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'apikey': this.config.apiKey
      }
    });

    // Import controllers
    this.chat = require('./instanceChatController').default(this.http);
    this.instance = require('./instanceController').default(this.http);
    this.group = require('./instanceGroupController').default(this.http);
    this.profile = require('./instanceProfileController').default(this.http);
    this.settings = require('./instanceSettingsController').default(this.http);
  }

  setApiKey(apiKey) {
    this.config.apiKey = apiKey;
    this.http.defaults.headers['apikey'] = apiKey;
  }

  setBaseURL(baseURL) {
    this.config.baseURL = baseURL;
    this.http.defaults.baseURL = baseURL;
  }
}

export default Evolution2SDK;
