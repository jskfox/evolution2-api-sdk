import axios from "axios";

const createHttp = (config = {}) => {
  const http = axios.create({
    headers: {
      "Content-type": "application/json",
      ...(config.headers || {})
    },
    ...config
  });

  http.interceptors.request.use(
    config => {
      // find all uri variables and replace them with the value from the params object
      // e.g. /instance/connect/:instance -> /instance/connect/instance1
      const params = Object.entries(config.params || {});
      if (params.length > 0) {
        config.url = config.url.replace(/:(\w+)/g, (_, key) => {
          const value = params.find(([k]) => k === key)?.[1];
          if (value) {
            delete config.params[key];
            return value;
          }
          return _;
        });
      }
      return config;
    },
    error => Promise.reject(error)
  );

  return http;
};

export default createHttp;
