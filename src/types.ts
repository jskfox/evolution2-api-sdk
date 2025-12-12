import { AxiosRequestConfig } from 'axios';

export interface Evolution2Config extends AxiosRequestConfig {
  host?: string;
  apiKey?: string;
}

export interface MessageOptions {
  number: string;
  text: string;
  delay?: number;
}

export interface GroupOptions {
  id: string;
  subject: string;
  subjectOwner?: string;
  subjectTime?: number;
  creation?: number;
  owner?: string;
  desc?: string;
  descOwner?: string;
  descId?: string;
  restrict?: boolean;
  announce?: boolean;
  participants?: any[];
}

export interface Instance {
  instanceName: string;
  instanceId?: string;
  integration?: string;
  status?: string;
}

export interface Profile {
  wid: string;
  name: string;
  notify?: string;
  verifiedName?: string;
  imgUrl?: string;
  status?: string;
}

export interface Settings {
  rejectCall?: boolean;
  msgCall?: string;
  groupsIgnore?: boolean;
  alwaysOnline?: boolean;
  readMessages?: boolean;
  readStatus?: boolean;
  syncFullHistory?: boolean;
}

export * from './types/base';
export * from './types/chat';
export * from './types/group';
export * from './types/instance';
export * from './types/profile';
export * from './types/settings';
export * from './types/message';
export * from './types/response';
