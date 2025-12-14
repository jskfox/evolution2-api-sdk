# Evolution2 API SDK - Complete Documentation

This document provides detailed information about every method available in the SDK.

## Table of Contents

- [Message Controller](#message-controller)
- [Instance Controller](#instance-controller)
- [Chat Controller](#chat-controller)
- [Group Controller](#group-controller)
- [Profile Controller](#profile-controller)
- [Settings Controller](#settings-controller)
- [Label Controller](#label-controller)
- [Websocket Controller](#websocket-controller)
- [Type Definitions](#type-definitions)

---

## Message Controller

The Message Controller handles all types of message sending operations.

> **Note**: All methods accept an optional instance name as the last parameter to override the default instance.

### sendText(options, instanceName?)

Send a text message with optional features like link preview and mentions.

**Parameters:**

```typescript
{
  number: string;           // Recipient number
  text: string;             // Message text
  delay?: number;           // Delay in milliseconds
  linkPreview?: boolean;    // Enable link preview
  mentionsEveryOne?: boolean;
  mentioned?: string[];     // Numbers to mention
}
```

**Example:**

```typescript
await client.message.sendText({
  number: '5511999999999',
  text: 'Hello! Check this: https://example.com',
  linkPreview: true,
  delay: 1000
});
```

### sendMedia(options, instanceName?)

Send images, videos, or documents.

**Parameters:**

```typescript
{
  number: string;
  mediatype: 'image' | 'video' | 'document';
  media: string;            // URL or base64
  caption?: string;
  fileName?: string;
  mimetype?: string;
}
```

**Example:**

```typescript
await client.message.sendMedia({
  number: '5511999999999',
  mediatype: 'image',
  media: 'https://example.com/photo.jpg',
  caption: 'Check out this photo!'
});
```

### sendWhatsAppAudio(options, instanceName?)

Send voice notes (WhatsApp audio format).

**Parameters:**

```typescript
{
  number: string;
  audio: string;            // URL or base64
  encoding?: boolean;
}
```

### sendSticker(options, instanceName?)

Send stickers.

**Parameters:**

```typescript
{
  number: string;
  sticker: string;          // URL or base64 (WebP format)
}
```

### sendLocation(options, instanceName?)

Share location coordinates.

**Parameters:**

```typescript
{
  number: string;
  name: string;             // Location name
  address: string;
  latitude: number;
  longitude: number;
}
```

### sendContact(options, instanceName?)

Share contact cards.

**Parameters:**

```typescript
{
  number: string;
  contact: Array<{
    fullName: string;
    wuid: string;           // WhatsApp ID
    phoneNumber: string;
    organization?: string;
    email?: string;
    url?: string;
  }>;
}
```

### sendReaction(options, instanceName?)

React to a message with an emoji.

**Parameters:**

```typescript
{
  key: {
    remoteJid: string;
    fromMe: boolean;
    id: string;
  };
  reaction: string;         // Emoji
}
```

### sendPoll(options, instanceName?)

Create a poll.

**Parameters:**

```typescript
{
  number: string;
  name: string;             // Poll question
  selectableCount: number;  // How many options can be selected
  values: string[];         // Poll options
}
```

### sendList(options, instanceName?)

Send an interactive list message.

**Parameters:**

```typescript
{
  number: string;
  title: string;
  description: string;
  buttonText: string;
  footerText?: string;
  sections: Array<{
    title: string;
    rows: Array<{
      title: string;
      description?: string;
      rowId: string;
    }>;
  }>;
}
```

### sendButtons(options, instanceName?)

Send a message with interactive buttons.

**Parameters:**

```typescript
{
  number: string;
  title: string;
  description: string;
  footer?: string;
  buttons: Array<{
    type: 'reply' | 'copy' | 'url' | 'call' | 'pix';
    displayText: string;
    id?: string;
    url?: string;
    phoneNumber?: string;
    // ... other button-specific fields
  }>;
}
```

### sendStatus(options, instanceName?)

Post to WhatsApp status (stories).

**Parameters:**

```typescript
{
  type: 'text' | 'image' | 'video' | 'audio';
  content: string;
  caption?: string;
  backgroundColor?: string;
  font?: 1 | 2 | 3 | 4 | 5;
  allContacts?: boolean;
  statusJidList?: string[];
}
```

### sendPtv(options, instanceName?)

Send a video note (PTV - Picture-in-Picture video).

**Parameters:**

```typescript
{
  number: string;
  video: string;            // URL or base64
}
```

---

## Instance Controller

Manage WhatsApp instances.

### fetchAll()

Get all instances.

**Returns:** `Promise<Instance[]>`

**Example:**

```typescript
const instances = await client.instance.fetchAll();
```

### create(params)

Create a new instance.

**Parameters:**

```typescript
{
  instanceName: string;
  integration?: string;     // Default: 'WHATSAPP-BAILEYS'
  qrcode?: boolean;
  number?: string;
  token?: string;
}
```

**Returns:** `Promise<Instance>`

### connect(instanceName?)

Connect an instance and get QR code.

**Returns:** `Promise<{ base64: string; code: string; ... }>`

### connectionState(instanceName?)

Get current connection state.

**Returns:** `Promise<{ instance: string; state: 'open' | 'close' | 'connecting' }>`

### setPresence(presence, instanceName?)

Set online/offline status.

**Parameters:**

- `presence`: `'available'` | `'unavailable'`

### restart(instanceName?)

Restart an instance.

### logout(instanceName?)

Disconnect and logout from an instance.

### delete(instanceName?)

Delete an instance permanently.

---

## Chat Controller

Handle chat operations and message management.

### findChats(instanceName?)

Get all chats.

**Returns:** `Promise<ChatContact[]>`

### hasWhatsapp(numbers, instanceName?)

Check if numbers have WhatsApp.

**Parameters:**

- `numbers`: `string[]`

**Returns:** `Promise<WhatsappNumberStatus[]>`

### findContacts(options?, instanceName?)

Search contacts.

**Parameters:**

```typescript
{
  where?: {
    id?: string;
  };
}
```

### markAsRead(options, instanceName?)

Mark messages as read.

**Parameters:**

```typescript
{
  readMessages: Array<{
    remoteJid: string;
    fromMe: boolean;
    id: string;
  }>;
}
```

### markChatUnread(options, instanceName?)

Mark a chat as unread.

**Parameters:**

```typescript
{
  chat: string;
  lastMessage: {
    key: {
      remoteJid: string;
      fromMe: boolean;
      id: string;
    };
  };
}
```

### archiveChat(options, instanceName?)

Archive or unarchive a chat.

**Parameters:**

```typescript
{
  chat: string;
  archive: boolean;
  lastMessage: { key: MessageKey };
}
```

### deleteMessage(options, instanceName?)

Delete a message for everyone.

**Parameters:**

```typescript
{
  id: string;
  remoteJid: string;
  fromMe: boolean;
  participant?: string;
}
```

### updateMessage(options, instanceName?)

Edit a sent message.

**Parameters:**

```typescript
{
  number: string;
  key: MessageKey;
  text: string;
}
```

### sendPresence(options, instanceName?)

Send typing or recording indicator.

**Parameters:**

```typescript
{
  number: string;
  presence: 'composing' | 'recording' | 'paused';
  delay?: number;
}
```

### updateBlockStatus(options, instanceName?)

Block or unblock a contact.

**Parameters:**

```typescript
{
  number: string;
  status: 'block' | 'unblock';
}
```

### fetchProfilePictureUrl(number, instanceName?)

Get profile picture URL.

**Parameters:**

- `number`: Contact number

**Returns:** `Promise<{ profilePictureUrl: string }>`

### getBase64FromMedia(options, instanceName?)

Extract base64 from a media message.

**Parameters:**

```typescript
{
  message: {
    key: { id: string };
  };
  convertToMp4?: boolean;
}
```

**Returns:** `Promise<{ base64: string; mimetype: string }>`

### findMessages(options?, instanceName?)

Search messages.

**Parameters:**

```typescript
{
  where?: {
    key?: {
      remoteJid?: string;
      id?: string;
    };
  };
  page?: number;
  offset?: number;
}
```

### findStatusMessage(options?, instanceName?)

Find status messages.

---

## Group Controller

Complete group management functionality.

### fetchAll(getParticipants?, instanceName?)

Get all groups.

**Parameters:**

- `getParticipants`: `boolean` - Include participant details

**Returns:** `Promise<GroupOptions[]>`

### findById(groupJid, instanceName?)

Get group information by ID.

**Parameters:**

- `groupJid`: Group JID (e.g., `'123456789@g.us'`)

### create(options, instanceName?)

Create a new group.

**Parameters:**

```typescript
{
  subject: string;
  description?: string;
  participants: string[];
}
```

### updatePicture(groupJid, imageUrl, instanceName?)

Update group picture.

**Parameters:**

- `groupJid`: Group ID
- `imageUrl`: Image URL or base64

### updateSubject(groupJid, subject, instanceName?)

Change group name.

### updateDescription(groupJid, description, instanceName?)

Update group description.

### fetchInviteCode(groupJid, instanceName?)

Get group invite link code.

**Returns:** `Promise<{ inviteCode: string }>`

### revokeInviteCode(groupJid, instanceName?)

Revoke current invite link and generate a new one.

### sendInvite(options, instanceName?)

Send group invite to numbers.

**Parameters:**

```typescript
{
  groupJid: string;
  description: string;
  numbers: string[];
}
```

### findByInviteCode(inviteCode, instanceName?)

Get group info from invite code.

### findParticipants(groupJid, instanceName?)

Get group participants.

### updateParticipant(groupJid, options, instanceName?)

Add, remove, promote, or demote participants.

**Parameters:**

```typescript
{
  action: 'add' | 'remove' | 'promote' | 'demote';
  participants: string[];
}
```

### updateSetting(groupJid, options, instanceName?)

Change group settings.

**Parameters:**

```typescript
{
  action: 'announcement' | 'not_announcement' | 'locked' | 'unlocked';
}
```

### toggleEphemeral(groupJid, expiration, instanceName?)

Enable/disable disappearing messages.

**Parameters:**

- `expiration`: `0` (off), `86400` (24h), `604800` (7d), `7776000` (90d)

### leave(groupJid, instanceName?)

Leave a group.

---

## Profile Controller

Manage profile and privacy settings.

### fetchProfile(number, instanceName?)

Get profile information.

**Returns:** `Promise<Profile>`

### fetchBusinessProfile(number, instanceName?)

Get business profile information.

### updateName(name, instanceName?)

Update profile name.

### updateStatus(status, instanceName?)

Update profile status message.

### updatePicture(pictureUrl, instanceName?)

Update profile picture.

### removePicture(instanceName?)

Remove profile picture.

### getPrivacy(instanceName?)

Get privacy settings.

**Returns:**

```typescript
Promise<{
  readreceipts?: 'all' | 'none';
  profile?: 'all' | 'contacts' | 'contact_blacklist' | 'none';
  status?: 'all' | 'contacts' | 'contact_blacklist' | 'none';
  online?: 'all' | 'match_last_seen';
  last?: 'all' | 'contacts' | 'contact_blacklist' | 'none';
  groupadd?: 'all' | 'contacts' | 'contact_blacklist';
}>
```

### updatePrivacy(settings, instanceName?)

Update privacy settings.

---

## Settings Controller

Configure instance settings and integrations.

### findOptions(instanceName?)

Get current instance settings.

### setOptions(data, instanceName?)

Update instance settings.

**Parameters:**

```typescript
{
  rejectCall?: boolean;
  msgCall?: string;
  groupsIgnore?: boolean;
  alwaysOnline?: boolean;
  readMessages?: boolean;
  readStatus?: boolean;
  syncFullHistory?: boolean;
}
```

### findWebhook(instanceName?)

Get webhook configuration.

### setWebhook(data, instanceName?)

Configure webhook.

**Parameters:**

```typescript
{
  url: string;
  byEvents?: boolean;
  base64?: boolean;
  events?: string[];
}
```

### findWebsocket(instanceName?)

Get websocket configuration.

### setWebsocket(data, instanceName?)

Configure websocket.

### findRabbitmq(instanceName?)

Get RabbitMQ configuration.

### setRabbitmq(data, instanceName?)

Configure RabbitMQ integration.

### findChatwoot(instanceName?)

Get Chatwoot configuration.

### setChatwoot(data, instanceName?)

Configure Chatwoot integration.

### findTypebot(instanceName?)

Get Typebot configuration.

### setTypebot(data, instanceName?)

Configure Typebot integration.

### changeTypebotStatus(data, instanceName?)

Change Typebot status.

---

## Label Controller

Manage WhatsApp labels.

### findLabels(instanceName?)

Get all labels.

**Returns:** `Promise<Label[]>`

### handleLabel(options, instanceName?)

Add or remove a label from a chat.

**Parameters:**

```typescript
{
  number: string;
  labelId: string;
  action: 'add' | 'remove';
}
```

---

## Websocket Controller

Configure websocket events.

### set(settings, instanceName?)

Configure websocket.

**Parameters:**

```typescript
{
  websocket: {
    enabled: boolean;
    events?: string[];
  };
}
```

**Available events:**

- `MESSAGES_UPSERT`
- `MESSAGES_UPDATE`
- `MESSAGES_DELETE`
- `CONNECTION_UPDATE`
- `PRESENCE_UPDATE`
- `CHATS_UPDATE`
- `CONTACTS_UPDATE`
- `GROUPS_UPSERT`
- `GROUP_UPDATE`
- `GROUP_PARTICIPANTS_UPDATE`
- `CALL`

### find(instanceName?)

Get current websocket configuration.

---

## Type Definitions

### Core Types

```typescript
interface Evolution2SDKConfig {
  host: string;
  apiKey: string;
  instanceName?: string;  // Optional default instance
}

interface Instance {
  instanceName: string;
  instanceId?: string;
  integration?: string;
  status?: string;
}

interface Profile {
  wid: string;
  name: string;
  notify?: string;
  verifiedName?: string;
  imgUrl?: string;
  status?: string;
}
```

### Message Types

```typescript
interface TextMessageOptions {
  number: string;
  text: string;
  delay?: number;
  quoted?: MessageQuoted;
  linkPreview?: boolean;
  mentionsEveryOne?: boolean;
  mentioned?: string[];
}

interface MediaMessageOptions {
  number: string;
  mediatype: 'image' | 'video' | 'document';
  media: string;
  mimetype?: string;
  caption?: string;
  fileName?: string;
}

interface AudioMessageOptions {
  number: string;
  audio: string;
  encoding?: boolean;
}

interface LocationMessageOptions {
  number: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface ContactInfo {
  fullName: string;
  wuid: string;
  phoneNumber: string;
  organization?: string;
  email?: string;
  url?: string;
}

interface PollMessageOptions {
  number: string;
  name: string;
  selectableCount: number;
  values: string[];
}

interface ListRow {
  title: string;
  description?: string;
  rowId: string;
}

interface ListSection {
  title: string;
  rows: ListRow[];
}

interface ListMessageOptions {
  number: string;
  title: string;
  description: string;
  buttonText: string;
  footerText?: string;
  sections: ListSection[];
}

type MessageButton = ButtonReply | ButtonCopy | ButtonUrl | ButtonCall | ButtonPix;

interface ButtonsMessageOptions {
  number: string;
  title: string;
  description: string;
  footer?: string;
  buttons: MessageButton[];
}
```

### Chat Types

```typescript
interface ChatContact {
  id: string;
  name: string;
  number: string;
  isGroup: boolean;
  isMyContact: boolean;
}

interface MessageKey {
  remoteJid: string;
  fromMe: boolean;
  id: string;
}
```

### Group Types

```typescript
interface GroupOptions {
  id: string;
  subject: string;
  subjectOwner?: string;
  subjectTime?: number;
  creation?: number;
  owner?: string;
  desc?: string;
  participants?: any[];
}

interface CreateGroupOptions {
  subject: string;
  description?: string;
  participants: string[];
}
```

### Settings Types

```typescript
interface SettingsOptions {
  rejectCall?: boolean;
  msgCall?: string;
  groupsIgnore?: boolean;
  alwaysOnline?: boolean;
  readMessages?: boolean;
  readStatus?: boolean;
  syncFullHistory?: boolean;
}

interface WebhookSettings {
  url: string;
  byEvents?: boolean;
  base64?: boolean;
  events?: WebhookEvent[];
}

type WebhookEvent = 
  | 'MESSAGES_UPSERT'
  | 'MESSAGES_UPDATE'
  | 'CONNECTION_UPDATE'
  | 'PRESENCE_UPDATE'
  // ... and more
```

### Response Types

```typescript
interface SendMessageResult {
  key: MessageKey;
  message: Record<string, any>;
  messageTimestamp: number;
  status: 'PENDING' | 'SENT' | 'DELIVERED' | 'READ' | 'ERROR';
  messageType?: string;
}

interface ConnectionStateResult {
  instance: string;
  state: 'open' | 'close' | 'connecting';
  statusReason?: number;
}

interface QRCodeResult {
  pairingCode?: string;
  code?: string;
  base64?: string;
  count?: number;
}

interface CreateInstanceResult {
  instance: {
    instanceName: string;
    instanceId: string;
    integration: string;
    status: string;
  };
  hash: string;
  qrcode?: QRCodeResult;
}

interface SuccessResult {
  status: 'success' | boolean;
  message?: string;
}
```

---

## Advanced Usage

### Multi-Instance Management

```typescript
const client = new Evolution2SDK({
  host: 'https://api.example.com',
  apiKey: 'key123',
  instanceName: 'default-instance'
});

// Use default instance
await client.message.sendText({ number: '123', text: 'Hi' });

// Use specific instance
await client.message.sendText({ number: '456', text: 'Hello' }, 'sales-bot');

// Switch default instance
client.setInstance('support-bot');
await client.message.sendText({ number: '789', text: 'Hey' });
```

### Error Handling Patterns

```typescript
try {
  const result = await client.message.sendText({
    number: '5511999999999',
    text: 'Hello'
  });
  console.log('Message sent:', result);
} catch (error) {
  if (error.response?.status === 404) {
    console.error('Instance not found');
  } else if (error.response?.status === 401) {
    console.error('Invalid API key');
  } else {
    console.error('Error:', error.message);
  }
}
```

### Webhook Integration

```typescript
// Configure webhook to receive events
await client.settings.setWebhook({
  url: 'https://your-server.com/webhook',
  byEvents: false,
  base64: true,
  events: [
    'MESSAGES_UPSERT',
    'CONNECTION_UPDATE'
  ]
});

// Your webhook endpoint should handle:
// POST /webhook
// Body: { event: string, data: any, instance: string }
```

### Websocket Integration

```typescript
// Enable websocket events
await client.websocket.set({
  websocket: {
    enabled: true,
    events: [
      'MESSAGES_UPSERT',
      'MESSAGES_UPDATE',
      'CONNECTION_UPDATE'
    ]
  }
});

// Connect to websocket (implementation depends on your setup)
// ws://your-evolution-api.com/websocket/instance-name
```

---

## Best Practices

### Media Formats

For best compatibility, use these recommended formats:

| Type | Recommended Format | Max Size | Notes |
|------|-------------------|----------|-------|
| Image | PNG, JPG, WebP | 5MB | WebP preferred for smaller size |
| Video | MP4 (H.264) | 16MB | Keep under 1 minute for best delivery |
| Audio | OGG/Opus | 16MB | Native WhatsApp format, best quality |
| Document | PDF | 100MB | Other formats supported but PDF is universal |
| Sticker | WebP | 500KB | 512x512 pixels max |

### Base64 Usage

The SDK automatically handles base64 prefixes. You can use either format:

```typescript
// With prefix (automatically stripped)
const media = 'data:image/png;base64,iVBORw0KGgo...';

// Without prefix (recommended)
const media = 'iVBORw0KGgo...';

// Both work the same
await client.message.sendMedia({
  number: '5511999999999',
  mediatype: 'image',
  media: media
});
```

### Reading Local Files

```typescript
import * as fs from 'fs';

// Read file and convert to base64
const buffer = fs.readFileSync('./photo.png');
const base64 = buffer.toString('base64');

await client.message.sendMedia({
  number: '5511999999999',
  mediatype: 'image',
  media: base64,
  mimetype: 'image/png',
  fileName: 'photo.png'
});
```

### Helper Functions

The SDK exports utility functions you can use:

```typescript
import { normalizeBase64, isUrl, RECOMMENDED_FORMATS, MAX_FILE_SIZES } from 'evolution2-api-sdk';

// Check if input is URL or base64
if (isUrl(input)) {
  // It's a URL
} else {
  // It's base64, normalize it
  const clean = normalizeBase64(input);
}

// Check recommended formats
console.log(RECOMMENDED_FORMATS.audio); // ['audio/ogg', 'audio/mpeg']
console.log(MAX_FILE_SIZES.image);      // 5242880 (5MB)
```

---

## Troubleshooting

### Common Errors

#### Error 400: Bad Request

**Causes:**

- Invalid phone number format (missing country code)
- Unsupported media format
- Base64 with incorrect prefix

**Solutions:**

```typescript
// ✅ Correct: Include country code without + or spaces
number: '5511999999999'

// ❌ Wrong
number: '+55 11 99999-9999'
number: '11999999999'
```

#### Error 401: Unauthorized

**Causes:**

- Invalid or missing API key
- API key doesn't have permission for instance

**Solutions:**

```typescript
// Verify API key is correct
const client = new Evolution2SDK({
  host: 'https://your-api.com',
  apiKey: 'your-correct-api-key',
  instanceName: 'your-instance'
});
```

#### Error 404: Instance Not Found

**Causes:**

- Instance doesn't exist
- Instance name is misspelled

**Solutions:**

```typescript
// List all instances to verify name
const instances = await client.instance.fetchInstances();
console.log(instances.map(i => i.instance.instanceName));
```

#### Error 500: Server Error

**Causes:**

- Media URL not accessible from server
- File too large
- Server-side processing error

**Solutions:**

- Use base64 instead of URLs
- Reduce file size
- Check server logs

### Deprecated Features

Some WhatsApp features have been deprecated by Meta:

| Feature | Status | Alternative |
|---------|--------|-------------|
| `sendList()` | Deprecated | Use `sendButtons()` with reply buttons |
| `sendStatus()` | Limited | Only works with WhatsApp Business API |
| Interactive templates | Deprecated | Use native button types |

### Permission Issues

#### Group Operations

Some group operations require admin permissions:

```typescript
// These require admin permissions:
// - fetchInviteCode()
// - updateGroupSubject()
// - updateGroupDescription()
// - addParticipants()
// - removeParticipants()
// - promoteParticipants()
// - demoteParticipants()

// Check admin status first
const participants = await client.group.findParticipants({ groupJid: 'group@g.us' });
const myNumber = '5511999999999@s.whatsapp.net';
const amAdmin = participants.some(p => 
  p.id === myNumber && (p.admin === 'admin' || p.admin === 'superadmin')
);
```

---

For more information, visit the [Evolution API documentation](https://doc.evolution-api.com).
