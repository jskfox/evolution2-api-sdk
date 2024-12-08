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

export interface MessageQuotedKey {
  id: string;
}

export interface MessageQuotedContent {
  conversation?: string;
  // Add other possible message content types as needed
  [key: string]: any;
}

export interface MessageQuoted {
  key?: MessageQuotedKey;
  message?: MessageQuotedContent;
}

export interface MessageOptions {
  number: string;
  text: string;
  delay?: number;
  quoted?: MessageQuoted;
  linkPreview?: boolean;
  mentionsEveryOne?: boolean;
  mentioned?: string[];
}
