export interface Instance {
  id: string;
  name: string;
  description?: string;
  token: string;
  status: 'CONNECTED' | 'DISCONNECTED' | 'CONNECTING';
  qrcode?: string;
  number?: string;
}

export interface InstanceConnection {
  status: Instance['status'];
  qrcode?: string;
  number?: string;
}

export interface CreateInstanceParams {
  name: string;
  description?: string;
  token: string;
}
