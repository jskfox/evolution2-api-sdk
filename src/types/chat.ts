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

export interface MessageKey {
  remoteJid: string;
  fromMe: boolean;
  id: string;
}

export interface MessageOptions {
  number: string;
  text: string;
  delay?: number;
}

export interface ButtonOption {
  type: 'reply';
  displayText: string;
  id: string;
}

export interface ButtonsOptions {
  number: string;
  title: string;
  description: string;
  footer?: string;
  buttons: ButtonOption[];
  delay?: number;
  quoted?: MessageQuoted;
  mentionsEveryOne?: boolean;
  mentioned?: string[];
}
