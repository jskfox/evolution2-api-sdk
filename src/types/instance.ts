export interface InstanceIntegration {
  integration: IntegrationType;
  token?: string;
  webhook_wa_business?: string;
}

export interface Instance {
  instanceName: string;
  instanceId: string;
  owner?: string;
  profileName?: string;
  profilePictureUrl?: string | null;
  profileStatus?: string;
  status: 'open' | 'close';
  serverUrl: string;
  apikey: string;
  integration: InstanceIntegration;
}

export interface InstanceConnection {
  status: Instance['status'];
  qrcode?: string;
  number?: string;
}

export interface CreateInstanceParams {
  instanceName: string;
  integration: IntegrationType;
  token?: string;
}

import { WebhookEvent } from './settings';

export type IntegrationType = 'WHATSAPP-BAILEYS' | 'WHATSAPP-BUSINESS';
