import { MessageQuoted, MessageKey } from './chat';

/**
 * Base options for all message types
 * Opciones base para todos los tipos de mensajes
 */
export interface BaseMessageOptions {
  /** Recipient number / Número del destinatario */
  number: string;
  /** Delay in milliseconds before sending / Retraso en milisegundos antes de enviar */
  delay?: number;
  /** Quote a previous message / Citar un mensaje anterior */
  quoted?: MessageQuoted;
  /** Mention everyone in group / Mencionar a todos en el grupo */
  mentionsEveryOne?: boolean;
  /** List of numbers to mention / Lista de números a mencionar */
  mentioned?: string[];
}

/**
 * Options for sending text messages
 * Opciones para enviar mensajes de texto
 */
export interface TextMessageOptions extends BaseMessageOptions {
  /** Message text / Texto del mensaje */
  text: string;
  /** Enable link preview / Habilitar vista previa de enlaces */
  linkPreview?: boolean;
}

/**
 * Options for sending media messages (image, video, document)
 * Opciones para enviar mensajes multimedia (imagen, video, documento)
 */
export interface MediaMessageOptions extends BaseMessageOptions {
  /** Media type / Tipo de multimedia */
  mediatype: 'image' | 'video' | 'document';
  /** MIME type / Tipo MIME */
  mimetype?: string;
  /** Caption for the media / Descripción del multimedia */
  caption?: string;
  /** URL or base64 of the media / URL o base64 del multimedia */
  media: string;
  /** File name / Nombre del archivo */
  fileName?: string;
}

/**
 * Options for sending WhatsApp audio (voice note)
 * Opciones para enviar audio de WhatsApp (nota de voz)
 */
export interface AudioMessageOptions extends BaseMessageOptions {
  /** URL or base64 of the audio / URL o base64 del audio */
  audio: string;
  /** Enable audio encoding / Habilitar codificación de audio */
  encoding?: boolean;
}

/**
 * Options for sending stickers
 * Opciones para enviar stickers
 */
export interface StickerMessageOptions extends BaseMessageOptions {
  /** URL or base64 of the sticker / URL o base64 del sticker */
  sticker: string;
}

/**
 * Options for sending location
 * Opciones para enviar ubicación
 */
export interface LocationMessageOptions extends BaseMessageOptions {
  /** Location name / Nombre del lugar */
  name: string;
  /** Address / Dirección */
  address: string;
  /** Latitude / Latitud */
  latitude: number;
  /** Longitude / Longitud */
  longitude: number;
}

/**
 * Contact information for sending contacts
 * Información de contacto para enviar contactos
 */
export interface ContactInfo {
  /** Full name / Nombre completo */
  fullName: string;
  /** WhatsApp User ID / ID de usuario de WhatsApp */
  wuid: string;
  /** Phone number with formatting / Número de teléfono con formato */
  phoneNumber: string;
  /** Organization (optional) / Organización (opcional) */
  organization?: string;
  /** Email (optional) / Correo electrónico (opcional) */
  email?: string;
  /** URL (optional) / URL (opcional) */
  url?: string;
}

/**
 * Options for sending contacts
 * Opciones para enviar contactos
 */
export interface ContactMessageOptions extends BaseMessageOptions {
  /** List of contacts / Lista de contactos */
  contact: ContactInfo[];
}

/**
 * Options for sending reactions
 * Opciones para enviar reacciones
 */
export interface ReactionMessageOptions {
  /** Message key to react to / Clave del mensaje a reaccionar */
  key: MessageKey;
  /** Reaction emoji / Emoji de reacción */
  reaction: string;
}

/**
 * Options for sending polls
 * Opciones para enviar encuestas
 */
export interface PollMessageOptions extends BaseMessageOptions {
  /** Poll title / Título de la encuesta */
  name: string;
  /** Number of selectable options / Número de opciones seleccionables */
  selectableCount: number;
  /** Poll options / Opciones de la encuesta */
  values: string[];
}

/**
 * Row in a list section
 * Fila en una sección de lista
 */
export interface ListRow {
  /** Row title / Título de la fila */
  title: string;
  /** Row description / Descripción de la fila */
  description?: string;
  /** Row ID / ID de la fila */
  rowId: string;
}

/**
 * Section in a list message
 * Sección en un mensaje de lista
 */
export interface ListSection {
  /** Section title / Título de la sección */
  title: string;
  /** Section rows / Filas de la sección */
  rows: ListRow[];
}

/**
 * Options for sending list messages
 * Opciones para enviar mensajes de lista
 */
export interface ListMessageOptions extends BaseMessageOptions {
  /** List title / Título de la lista */
  title: string;
  /** List description / Descripción de la lista */
  description: string;
  /** Button text / Texto del botón */
  buttonText: string;
  /** Footer text / Texto del pie */
  footerText?: string;
  /** List sections / Secciones de la lista */
  sections: ListSection[];
}

/**
 * Button types for button messages
 * Tipos de botones para mensajes con botones
 */
export interface ButtonReply {
  type: 'reply';
  displayText: string;
  id: string;
}

export interface ButtonCopy {
  type: 'copy';
  displayText: string;
  copyCode: string;
}

export interface ButtonUrl {
  type: 'url';
  displayText: string;
  url: string;
}

export interface ButtonCall {
  type: 'call';
  displayText: string;
  phoneNumber: string;
}

export interface ButtonPix {
  type: 'pix';
  currency: string;
  name: string;
  keyType: 'phone' | 'email' | 'cpf' | 'cnpj' | 'random';
  key: string;
}

export type MessageButton = ButtonReply | ButtonCopy | ButtonUrl | ButtonCall | ButtonPix;

/**
 * Options for sending button messages
 * Opciones para enviar mensajes con botones
 */
export interface ButtonsMessageOptions extends BaseMessageOptions {
  /** Button message title / Título del mensaje con botones */
  title: string;
  /** Button message description / Descripción del mensaje con botones */
  description: string;
  /** Footer text / Texto del pie */
  footer?: string;
  /** Buttons array / Array de botones */
  buttons: MessageButton[];
}

/**
 * Font types for status text
 * Tipos de fuente para texto de estado
 */
export type StatusFont = 1 | 2 | 3 | 4 | 5;
// 1 = SERIF, 2 = NORICAN_REGULAR, 3 = BRYNDAN_WRITE, 4 = BEBASNEUE_REGULAR, 5 = OSWALD_HEAVY

/**
 * Options for sending status/stories
 * Opciones para enviar estados/historias
 */
export interface StatusMessageOptions {
  /** Status type / Tipo de estado */
  type: 'text' | 'image' | 'video' | 'audio';
  /** Content (text or URL) / Contenido (texto o URL) */
  content: string;
  /** Caption for image/video / Descripción para imagen/video */
  caption?: string;
  /** Background color for text / Color de fondo para texto */
  backgroundColor?: string;
  /** Font type for text / Tipo de fuente para texto */
  font?: StatusFont;
  /** Send to all contacts / Enviar a todos los contactos */
  allContacts?: boolean;
  /** List of JIDs to send to / Lista de JIDs a los que enviar */
  statusJidList?: string[];
}

/**
 * Options for sending PTV (video note)
 * Opciones para enviar PTV (nota de video)
 */
export interface PtvMessageOptions extends BaseMessageOptions {
  /** URL or base64 of the video / URL o base64 del video */
  video: string;
}

/**
 * Generic message response
 * Respuesta genérica de mensaje
 */
export interface MessageResponse {
  key: {
    remoteJid: string;
    fromMe: boolean;
    id: string;
  };
  message: Record<string, any>;
  messageTimestamp: number;
  status: string;
}
