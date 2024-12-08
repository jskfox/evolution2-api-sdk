export interface MessageOptions {
  to: string;
  text: string;
  options?: {
    delay?: number;
    presence?: 'composing' | 'recording' | 'paused';
  };
}

export interface ChatContact {
  id: string;
  name: string;
  number: string;
  isGroup: boolean;
  isMyContact: boolean;
}

export interface WhatsappNumberStatus {
  number: string;
  exists: boolean;
  id?: string;
}
