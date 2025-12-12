import { MessageKey } from './chat';

// =============================================================================
// MESSAGE RESPONSES
// =============================================================================

/**
 * Result of sending any message type
 */
export interface SendMessageResult {
    key: MessageKey;
    message: Record<string, any>;
    messageTimestamp: number;
    status: 'PENDING' | 'SENT' | 'DELIVERED' | 'READ' | 'ERROR';
    messageType?: string;
}

// =============================================================================
// INSTANCE RESPONSES
// =============================================================================

/**
 * Connection state result
 */
export interface ConnectionStateResult {
    instance: string;
    state: 'open' | 'close' | 'connecting';
    statusReason?: number;
}

/**
 * QR Code connection result
 */
export interface QRCodeResult {
    pairingCode?: string;
    code?: string;
    base64?: string;
    count?: number;
}

/**
 * Instance creation result
 */
export interface CreateInstanceResult {
    instance: {
        instanceName: string;
        instanceId: string;
        integration: string;
        status: string;
    };
    hash: string;
    webhook?: {
        url: string;
        enabled: boolean;
    };
    websocket?: {
        enabled: boolean;
    };
    settings?: Record<string, any>;
    qrcode?: QRCodeResult;
}

// =============================================================================
// CHAT RESPONSES
// =============================================================================

/**
 * Profile picture URL result
 */
export interface ProfilePictureResult {
    wuid: string;
    profilePictureUrl: string | null;
}

/**
 * Base64 media extraction result
 */
export interface MediaBase64Result {
    base64: string;
    mimetype: string;
}

/**
 * Message search result
 */
export interface MessageSearchResult {
    key: MessageKey;
    pushName?: string;
    message: Record<string, any>;
    messageTimestamp: number;
    messageType?: string;
}

/**
 * Block status update result
 */
export interface BlockStatusResult {
    status: 'blocked' | 'unblocked';
    number: string;
}

// =============================================================================
// GROUP RESPONSES
// =============================================================================

/**
 * Participant info in groups
 */
export interface ParticipantInfo {
    id: string;
    admin?: 'admin' | 'superadmin' | null;
}

/**
 * Group creation result
 */
export interface CreateGroupResult {
    id: string;
    subject: string;
    creation: number;
    owner: string;
    desc?: string;
    participants: ParticipantInfo[];
}

/**
 * Group invite code result
 */
export interface InviteCodeResult {
    inviteCode: string;
    inviteUrl: string;
}

/**
 * Group info from invite code
 */
export interface InviteInfoResult {
    id: string;
    subject: string;
    creation: number;
    owner: string;
    desc?: string;
    descId?: string;
    size: number;
}

/**
 * Participant update result
 */
export interface UpdateParticipantResult {
    status: string;
    jid: string;
}

// =============================================================================
// PROFILE RESPONSES
// =============================================================================

/**
 * Fetched profile result
 */
export interface FetchProfileResult {
    wuid: string;
    name?: string;
    picture?: string;
    status?: string;
    isBusiness: boolean;
    description?: string;
    website?: string[];
    email?: string;
    category?: string;
}

/**
 * Privacy settings result
 */
export interface PrivacySettingsResult {
    readreceipts?: 'all' | 'none';
    profile?: 'all' | 'contacts' | 'contact_blacklist' | 'none';
    status?: 'all' | 'contacts' | 'contact_blacklist' | 'none';
    online?: 'all' | 'match_last_seen';
    last?: 'all' | 'contacts' | 'contact_blacklist' | 'none';
    groupadd?: 'all' | 'contacts' | 'contact_blacklist';
}

// =============================================================================
// LABEL RESPONSES
// =============================================================================

/**
 * Label information
 */
export interface LabelInfo {
    id: string;
    name: string;
    color: number;
    predefinedId?: string;
}

/**
 * Handle label result
 */
export interface HandleLabelResult {
    status: 'added' | 'removed';
    labelId: string;
    chatId: string;
}

// =============================================================================
// SETTINGS RESPONSES
// =============================================================================

/**
 * Instance settings result
 */
export interface SettingsResult {
    rejectCall: boolean;
    msgCall: string;
    groupsIgnore: boolean;
    alwaysOnline: boolean;
    readMessages: boolean;
    readStatus: boolean;
    syncFullHistory: boolean;
}

/**
 * Webhook configuration result
 */
export interface WebhookResult {
    enabled: boolean;
    url?: string;
    webhookByEvents?: boolean;
    webhookBase64?: boolean;
    events?: string[];
}

/**
 * Websocket configuration result
 */
export interface WebsocketResult {
    enabled: boolean;
    events?: string[];
}

// =============================================================================
// GENERIC RESPONSES
// =============================================================================

/**
 * Simple success response
 */
export interface SuccessResult {
    status: 'success' | boolean;
    message?: string;
}

/**
 * Delete/update generic result
 */
export interface ActionResult {
    status: boolean;
    error?: string;
    response?: Record<string, any>;
}
