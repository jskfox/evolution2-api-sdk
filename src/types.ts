import { AxiosInstance } from 'axios';

export interface Evolution2Config {
  host?: string;
  apiKey?: string;
  headers?: Record<string, string>;
  [key: string]: any;
}

export interface MessageOptions {
  number: string;
  message: string;
  options?: {
    delay?: number;
    presence?: boolean;
    linkPreview?: boolean;
  };
}

export interface GroupOptions {
  name: string;
  participants: string[];
  [key: string]: any;
}

export interface Instance {
  instanceName: string;
  status: string;
  [key: string]: any;
}

export interface Profile {
  name?: string;
  status?: string;
  picture?: string;
  [key: string]: any;
}

export interface Settings {
  instanceName: string;
  [key: string]: any;
}
