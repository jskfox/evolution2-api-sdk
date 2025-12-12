# Evolution2 API SDK - Documentación Completa

Este documento proporciona información detallada sobre cada método disponible en el SDK.

## Tabla de Contenidos

- [Controlador de Mensajes](#controlador-de-mensajes)
- [Controlador de Instancias](#controlador-de-instancias)
- [Controlador de Chat](#controlador-de-chat)
- [Controlador de Grupos](#controlador-de-grupos)
- [Controlador de Perfil](#controlador-de-perfil)
- [Controlador de Configuración](#controlador-de-configuración)
- [Controlador de Etiquetas](#controlador-de-etiquetas)
- [Controlador de Websocket](#controlador-de-websocket)
- [Definiciones de Tipos](#definiciones-de-tipos)

---

## Controlador de Mensajes

El Controlador de Mensajes maneja todas las operaciones de envío de mensajes.

> **Nota**: Todos los métodos aceptan un nombre de instancia opcional como último parámetro para sobrescribir la instancia por defecto.

### sendText(options, instanceName?)

Envía un mensaje de texto con características opcionales como vista previa de enlaces y menciones.

**Parámetros:**

```typescript
{
  number: string;           // Número del destinatario
  text: string;             // Texto del mensaje
  delay?: number;           // Retraso en milisegundos
  linkPreview?: boolean;    // Habilitar vista previa de enlaces
  mentionsEveryOne?: boolean;
  mentioned?: string[];     // Números a mencionar
}
```

**Ejemplo:**

```typescript
await client.message.sendText({
  number: '5511999999999',
  text: '¡Hola! Mira esto: https://ejemplo.com',
  linkPreview: true,
  delay: 1000
});
```

### sendMedia(options, instanceName?)

Envía imágenes, videos o documentos.

**Parámetros:**

```typescript
{
  number: string;
  mediatype: 'image' | 'video' | 'document';
  media: string;            // URL o base64
  caption?: string;
  fileName?: string;
  mimetype?: string;
}
```

**Ejemplo:**

```typescript
await client.message.sendMedia({
  number: '5511999999999',
  mediatype: 'image',
  media: 'https://ejemplo.com/foto.jpg',
  caption: '¡Mira esta foto!'
});
```

### sendWhatsAppAudio(options, instanceName?)

Envía notas de voz (formato de audio de WhatsApp).

**Parámetros:**

```typescript
{
  number: string;
  audio: string;            // URL o base64
  encoding?: boolean;
}
```

### sendSticker(options, instanceName?)

Envía stickers.

**Parámetros:**

```typescript
{
  number: string;
  sticker: string;          // URL o base64 (formato WebP)
}
```

### sendLocation(options, instanceName?)

Comparte coordenadas de ubicación.

**Parámetros:**

```typescript
{
  number: string;
  name: string;             // Nombre de la ubicación
  address: string;
  latitude: number;
  longitude: number;
}
```

### sendContact(options, instanceName?)

Comparte tarjetas de contacto.

**Parámetros:**

```typescript
{
  number: string;
  contact: Array<{
    fullName: string;
    wuid: string;           // ID de WhatsApp
    phoneNumber: string;
    organization?: string;
    email?: string;
    url?: string;
  }>;
}
```

### sendReaction(options, instanceName?)

Reacciona a un mensaje con un emoji.

**Parámetros:**

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

Crea una encuesta.

**Parámetros:**

```typescript
{
  number: string;
  name: string;             // Pregunta de la encuesta
  selectableCount: number;  // Cuántas opciones se pueden seleccionar
  values: string[];         // Opciones de la encuesta
}
```

### sendList(options, instanceName?)

Envía un mensaje de lista interactiva.

**Parámetros:**

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

Envía un mensaje con botones interactivos.

**Parámetros:**

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
    // ... otros campos específicos del botón
  }>;
}
```

### sendStatus(options, instanceName?)

Publica en el estado de WhatsApp (historias).

**Parámetros:**

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

Envía una nota de video (PTV - video Picture-in-Picture).

**Parámetros:**

```typescript
{
  number: string;
  video: string;            // URL o base64
}
```

---

## Controlador de Instancias

Gestiona las instancias de WhatsApp.

### fetchAll()

Obtiene todas las instancias.

**Retorna:** `Promise<Instance[]>`

**Ejemplo:**

```typescript
const instances = await client.instance.fetchAll();
```

### create(params)

Crea una nueva instancia.

**Parámetros:**

```typescript
{
  instanceName: string;
  integration?: string;     // Por defecto: 'WHATSAPP-BAILEYS'
  qrcode?: boolean;
  number?: string;
  token?: string;
}
```

**Retorna:** `Promise<Instance>`

### connect(instanceName?)

Conecta una instancia y obtiene el código QR.

**Retorna:** `Promise<{ base64: string; code: string; ... }>`

### connectionState(instanceName?)

Obtiene el estado de conexión actual.

**Retorna:** `Promise<{ instance: string; state: 'open' | 'close' | 'connecting' }>`

### setPresence(presence, instanceName?)

Establece el estado en línea/fuera de línea.

**Parámetros:**

- `presence`: `'available'` | `'unavailable'`

### restart(instanceName?)

Reinicia una instancia.

### logout(instanceName?)

Desconecta y cierra sesión de una instancia.

### delete(instanceName?)

Elimina una instancia permanentemente.

---

## Controlador de Chat

Maneja operaciones de chat y gestión de mensajes.

### findChats(instanceName?)

Obtiene todos los chats.

**Retorna:** `Promise<ChatContact[]>`

### hasWhatsapp(numbers, instanceName?)

Verifica si los números tienen WhatsApp.

**Parámetros:**

- `numbers`: `string[]`

**Retorna:** `Promise<WhatsappNumberStatus[]>`

### findContacts(options?, instanceName?)

Busca contactos.

**Parámetros:**

```typescript
{
  where?: {
    id?: string;
  };
}
```

### markAsRead(options, instanceName?)

Marca mensajes como leídos.

**Parámetros:**

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

Marca un chat como no leído.

**Parámetros:**

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

Archiva o desarchivar un chat.

**Parámetros:**

```typescript
{
  chat: string;
  archive: boolean;
  lastMessage: { key: MessageKey };
}
```

### deleteMessage(options, instanceName?)

Elimina un mensaje para todos.

**Parámetros:**

```typescript
{
  id: string;
  remoteJid: string;
  fromMe: boolean;
  participant?: string;
}
```

### updateMessage(options, instanceName?)

Edita un mensaje enviado.

**Parámetros:**

```typescript
{
  number: string;
  key: MessageKey;
  text: string;
}
```

### sendPresence(options, instanceName?)

Envía indicador de escritura o grabación.

**Parámetros:**

```typescript
{
  number: string;
  presence: 'composing' | 'recording' | 'paused';
  delay?: number;
}
```

### updateBlockStatus(options, instanceName?)

Bloquea o desbloquea un contacto.

**Parámetros:**

```typescript
{
  number: string;
  status: 'block' | 'unblock';
}
```

### fetchProfilePictureUrl(number, instanceName?)

Obtiene la URL de la foto de perfil.

**Parámetros:**

- `number`: Número del contacto

**Retorna:** `Promise<{ profilePictureUrl: string }>`

### getBase64FromMedia(options, instanceName?)

Extrae base64 de un mensaje multimedia.

**Parámetros:**

```typescript
{
  message: {
    key: { id: string };
  };
  convertToMp4?: boolean;
}
```

**Retorna:** `Promise<{ base64: string; mimetype: string }>`

### findMessages(options?, instanceName?)

Busca mensajes.

**Parámetros:**

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

Busca mensajes de estado.

---

## Controlador de Grupos

Funcionalidad completa de gestión de grupos.

### fetchAll(getParticipants?, instanceName?)

Obtiene todos los grupos.

**Parámetros:**

- `getParticipants`: `boolean` - Incluir detalles de participantes

**Retorna:** `Promise<GroupOptions[]>`

### findById(groupJid, instanceName?)

Obtiene información del grupo por ID.

**Parámetros:**

- `groupJid`: JID del grupo (ej., `'123456789@g.us'`)

### create(options, instanceName?)

Crea un nuevo grupo.

**Parámetros:**

```typescript
{
  subject: string;
  description?: string;
  participants: string[];
}
```

### updatePicture(groupJid, imageUrl, instanceName?)

Actualiza la foto del grupo.

**Parámetros:**

- `groupJid`: ID del grupo
- `imageUrl`: URL de imagen o base64

### updateSubject(groupJid, subject, instanceName?)

Cambia el nombre del grupo.

### updateDescription(groupJid, description, instanceName?)

Actualiza la descripción del grupo.

### fetchInviteCode(groupJid, instanceName?)

Obtiene el código del enlace de invitación del grupo.

**Retorna:** `Promise<{ inviteCode: string }>`

### revokeInviteCode(groupJid, instanceName?)

Revoca el enlace de invitación actual y genera uno nuevo.

### sendInvite(options, instanceName?)

Envía invitación del grupo a números.

**Parámetros:**

```typescript
{
  groupJid: string;
  description: string;
  numbers: string[];
}
```

### findByInviteCode(inviteCode, instanceName?)

Obtiene información del grupo desde el código de invitación.

### findParticipants(groupJid, instanceName?)

Obtiene los participantes del grupo.

### updateParticipant(groupJid, options, instanceName?)

Agrega, elimina, promueve o degrada participantes.

**Parámetros:**

```typescript
{
  action: 'add' | 'remove' | 'promote' | 'demote';
  participants: string[];
}
```

### updateSetting(groupJid, options, instanceName?)

Cambia la configuración del grupo.

**Parámetros:**

```typescript
{
  action: 'announcement' | 'not_announcement' | 'locked' | 'unlocked';
}
```

### toggleEphemeral(groupJid, expiration, instanceName?)

Habilita/deshabilita mensajes temporales.

**Parámetros:**

- `expiration`: `0` (desactivado), `86400` (24h), `604800` (7d), `7776000` (90d)

### leave(groupJid, instanceName?)

Sale de un grupo.

---

## Controlador de Perfil

Gestiona configuración de perfil y privacidad.

### fetchProfile(number, instanceName?)

Obtiene información del perfil.

**Retorna:** `Promise<Profile>`

### fetchBusinessProfile(number, instanceName?)

Obtiene información del perfil empresarial.

### updateName(name, instanceName?)

Actualiza el nombre del perfil.

### updateStatus(status, instanceName?)

Actualiza el mensaje de estado del perfil.

### updatePicture(pictureUrl, instanceName?)

Actualiza la foto de perfil.

### removePicture(instanceName?)

Elimina la foto de perfil.

### getPrivacy(instanceName?)

Obtiene la configuración de privacidad.

**Retorna:**

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

Actualiza la configuración de privacidad.

---

## Controlador de Configuración

Configura ajustes de instancia e integraciones.

### findOptions(instanceName?)

Obtiene la configuración actual de la instancia.

### setOptions(data, instanceName?)

Actualiza la configuración de la instancia.

**Parámetros:**

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

Obtiene la configuración del webhook.

### setWebhook(data, instanceName?)

Configura el webhook.

**Parámetros:**

```typescript
{
  url: string;
  byEvents?: boolean;
  base64?: boolean;
  events?: string[];
}
```

### findWebsocket(instanceName?)

Obtiene la configuración del websocket.

### setWebsocket(data, instanceName?)

Configura el websocket.

### findRabbitmq(instanceName?)

Obtiene la configuración de RabbitMQ.

### setRabbitmq(data, instanceName?)

Configura la integración con RabbitMQ.

### findChatwoot(instanceName?)

Obtiene la configuración de Chatwoot.

### setChatwoot(data, instanceName?)

Configura la integración con Chatwoot.

### findTypebot(instanceName?)

Obtiene la configuración de Typebot.

### setTypebot(data, instanceName?)

Configura la integración con Typebot.

### changeTypebotStatus(data, instanceName?)

Cambia el estado de Typebot.

---

## Controlador de Etiquetas

Gestiona las etiquetas de WhatsApp.

### findLabels(instanceName?)

Obtiene todas las etiquetas.

**Retorna:** `Promise<Label[]>`

### handleLabel(options, instanceName?)

Agrega o elimina una etiqueta de un chat.

**Parámetros:**

```typescript
{
  number: string;
  labelId: string;
  action: 'add' | 'remove';
}
```

---

## Controlador de Websocket

Configura eventos de websocket.

### set(settings, instanceName?)

Configura el websocket.

**Parámetros:**

```typescript
{
  websocket: {
    enabled: boolean;
    events?: string[];
  };
}
```

**Eventos disponibles:**

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

Obtiene la configuración actual del websocket.

---

## Definiciones de Tipos

### Tipos Principales

```typescript
interface Evolution2SDKConfig {
  host: string;
  apiKey: string;
  instanceName?: string;  // Instancia por defecto opcional
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

### Tipos de Mensajes

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

### Tipos de Chat

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

### Tipos de Grupos

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

### Tipos de Configuración

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
  // ... y más
```

---

## Uso Avanzado

### Gestión Multi-Instancia

```typescript
const client = new Evolution2SDK({
  host: 'https://api.ejemplo.com',
  apiKey: 'key123',
  instanceName: 'instancia-por-defecto'
});

// Usar instancia por defecto
await client.message.sendText({ number: '123', text: 'Hola' });

// Usar instancia específica
await client.message.sendText({ number: '456', text: 'Hola' }, 'bot-ventas');

// Cambiar instancia por defecto
client.setInstance('bot-soporte');
await client.message.sendText({ number: '789', text: 'Hey' });
```

### Patrones de Manejo de Errores

```typescript
try {
  const result = await client.message.sendText({
    number: '5511999999999',
    text: 'Hola'
  });
  console.log('Mensaje enviado:', result);
} catch (error) {
  if (error.response?.status === 404) {
    console.error('Instancia no encontrada');
  } else if (error.response?.status === 401) {
    console.error('API key inválida');
  } else {
    console.error('Error:', error.message);
  }
}
```

### Integración con Webhook

```typescript
// Configurar webhook para recibir eventos
await client.settings.setWebhook({
  url: 'https://tu-servidor.com/webhook',
  byEvents: false,
  base64: true,
  events: [
    'MESSAGES_UPSERT',
    'CONNECTION_UPDATE'
  ]
});

// Tu endpoint webhook debe manejar:
// POST /webhook
// Body: { event: string, data: any, instance: string }
```

### Integración con Websocket

```typescript
// Habilitar eventos websocket
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

// Conectar al websocket (la implementación depende de tu configuración)
// ws://tu-evolution-api.com/websocket/nombre-instancia
```

---

Para más información, visita la [documentación de Evolution API](https://doc.evolution-api.com).
