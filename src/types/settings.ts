export interface Settings {
  rejectCalls: boolean;
  groupsAdminsOnly: boolean;
  markMessagesRead: boolean;
  readReceipts: boolean;
  keepOnlineStatus: boolean;
  webhookUrl?: string;
  events?: WebhookEvent[];
}

export type WebhookEvent = 
  | 'message'
  | 'message.ack'
  | 'message.any'
  | 'message.revoke'
  | 'group.join'
  | 'group.leave'
  | 'group.update'
  | 'presence.update'
  | 'connection.update';

export interface SettingsUpdate {
  rejectCalls?: boolean;
  groupsAdminsOnly?: boolean;
  markMessagesRead?: boolean;
  readReceipts?: boolean;
  keepOnlineStatus?: boolean;
  webhookUrl?: string;
  events?: WebhookEvent[];
}
