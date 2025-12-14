import { AxiosInstance } from 'axios';
import { BaseControllerConfig, handleApiError, resolveInstance } from '../types/base';
import {
    TextMessageOptions,
    MediaMessageOptions,
    AudioMessageOptions,
    StickerMessageOptions,
    LocationMessageOptions,
    ContactMessageOptions,
    ReactionMessageOptions,
    PollMessageOptions,
    ListMessageOptions,
    ButtonsMessageOptions,
    StatusMessageOptions,
    PtvMessageOptions
} from '../types/message';
import { SendMessageResult } from '../types/response';
import { normalizeBase64, isUrl } from '../utils/mediaHelpers';


/**
 * Controller for sending all types of messages
 * Controlador para enviar todos los tipos de mensajes
 * 
 * @example
 * ```typescript
 * // With default instance / Con instancia por defecto
 * await evoApi.message.sendText({ number: '5511999999999', text: 'Hello!' });
 * 
 * // Override instance / Sobrescribir instancia
 * await evoApi.message.sendText({ number: '5511999999999', text: 'Hello!' }, 'other-instance');
 * ```
 */
class MessageController {
    private http: AxiosInstance;
    private config: BaseControllerConfig;

    constructor(config: BaseControllerConfig) {
        this.http = config.http;
        this.config = config;
    }

    /**
     * Send a text message
     * Enviar un mensaje de texto
     * @param options - Message options / Opciones del mensaje
     * @param instanceName - Optional instance name override / Nombre de instancia opcional
     */
    async sendText(options: TextMessageOptions, instanceName?: string): Promise<SendMessageResult> {
        try {
            const instance = resolveInstance(instanceName, this.config);
            const response = await this.http.post<SendMessageResult>(
                `/message/sendText/${instance}`,
                options,
                { params: { instance } }
            );
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    /**
     * Send media (image, video, document)
     * Enviar multimedia (imagen, video, documento)
     * 
     * @remarks
     * - For base64: You can pass with or without the "data:...;base64," prefix - it will be stripped automatically
     * - For URLs: Pass the full URL starting with http:// or https://
     * - Recommended formats: PNG/JPG for images, MP4 for video, PDF for documents
     * 
     * Para base64: Puedes pasar con o sin el prefijo "data:...;base64," - se elimina automáticamente
     * Para URLs: Pasa la URL completa comenzando con http:// o https://
     * Formatos recomendados: PNG/JPG para imágenes, MP4 para video, PDF para documentos
     */
    async sendMedia(options: MediaMessageOptions, instanceName?: string): Promise<SendMessageResult> {
        try {
            const instance = resolveInstance(instanceName, this.config);

            // Normalize base64 if not a URL (strip data: prefix)
            const normalizedOptions = {
                ...options,
                media: isUrl(options.media) ? options.media : normalizeBase64(options.media)
            };

            const response = await this.http.post<SendMessageResult>(
                `/message/sendMedia/${instance}`,
                normalizedOptions,
                { params: { instance } }
            );
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    /**
     * Send WhatsApp audio (voice note)
     * Enviar audio de WhatsApp (nota de voz)
     * 
     * @remarks
     * - Recommended format: OGG/Opus (native WhatsApp format)
     * - Base64 prefix is stripped automatically
     * 
     * Formato recomendado: OGG/Opus (formato nativo de WhatsApp)
     * El prefijo base64 se elimina automáticamente
     */
    async sendWhatsAppAudio(options: AudioMessageOptions, instanceName?: string): Promise<SendMessageResult> {
        try {
            const instance = resolveInstance(instanceName, this.config);

            // Normalize base64 if not a URL
            const normalizedOptions = {
                ...options,
                audio: isUrl(options.audio) ? options.audio : normalizeBase64(options.audio)
            };

            const response = await this.http.post<SendMessageResult>(
                `/message/sendWhatsAppAudio/${instance}`,
                normalizedOptions,
                { params: { instance } }
            );
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    /**
     * Send a sticker
     * Enviar un sticker
     * 
     * @remarks
     * - Format: WebP (512x512 max)
     * - Base64 prefix is stripped automatically
     */
    async sendSticker(options: StickerMessageOptions, instanceName?: string): Promise<SendMessageResult> {
        try {
            const instance = resolveInstance(instanceName, this.config);

            // Normalize base64 if not a URL
            const normalizedOptions = {
                ...options,
                sticker: isUrl(options.sticker) ? options.sticker : normalizeBase64(options.sticker)
            };

            const response = await this.http.post<SendMessageResult>(
                `/message/sendSticker/${instance}`,
                normalizedOptions,
                { params: { instance } }
            );
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    /**
     * Send a location
     * Enviar una ubicación
     */
    async sendLocation(options: LocationMessageOptions, instanceName?: string): Promise<SendMessageResult> {
        try {
            const instance = resolveInstance(instanceName, this.config);
            const response = await this.http.post<SendMessageResult>(
                `/message/sendLocation/${instance}`,
                options,
                { params: { instance } }
            );
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    /**
     * Send one or more contacts
     * Enviar uno o más contactos
     */
    async sendContact(options: ContactMessageOptions, instanceName?: string): Promise<SendMessageResult> {
        try {
            const instance = resolveInstance(instanceName, this.config);
            const response = await this.http.post<SendMessageResult>(
                `/message/sendContact/${instance}`,
                options,
                { params: { instance } }
            );
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    /**
     * Send a reaction to a message
     * Enviar una reacción a un mensaje
     */
    async sendReaction(options: ReactionMessageOptions, instanceName?: string): Promise<SendMessageResult> {
        try {
            const instance = resolveInstance(instanceName, this.config);
            const response = await this.http.post<SendMessageResult>(
                `/message/sendReaction/${instance}`,
                options,
                { params: { instance } }
            );
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    /**
     * Send a poll
     * Enviar una encuesta
     */
    async sendPoll(options: PollMessageOptions, instanceName?: string): Promise<SendMessageResult> {
        try {
            const instance = resolveInstance(instanceName, this.config);
            const response = await this.http.post<SendMessageResult>(
                `/message/sendPoll/${instance}`,
                options,
                { params: { instance } }
            );
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    /**
     * Send a list message
     * Enviar un mensaje de lista
     */
    async sendList(options: ListMessageOptions, instanceName?: string): Promise<SendMessageResult> {
        try {
            const instance = resolveInstance(instanceName, this.config);
            const response = await this.http.post<SendMessageResult>(
                `/message/sendList/${instance}`,
                options,
                { params: { instance } }
            );
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    /**
     * Send a button message
     * Enviar un mensaje con botones
     */
    async sendButtons(options: ButtonsMessageOptions, instanceName?: string): Promise<SendMessageResult> {
        try {
            const instance = resolveInstance(instanceName, this.config);
            const response = await this.http.post<SendMessageResult>(
                `/message/sendButtons/${instance}`,
                options,
                { params: { instance } }
            );
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    /**
     * Send a status/story
     * Enviar un estado/historia
     */
    async sendStatus(options: StatusMessageOptions, instanceName?: string): Promise<SendMessageResult> {
        try {
            const instance = resolveInstance(instanceName, this.config);
            const response = await this.http.post<SendMessageResult>(
                `/message/sendStatus/${instance}`,
                options,
                { params: { instance } }
            );
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    /**
     * Send a PTV (video note)
     * Enviar un PTV (nota de video)
     * 
     * @remarks
     * - Format: MP4 (circular video note like Telegram)
     * - Base64 prefix is stripped automatically
     */
    async sendPtv(options: PtvMessageOptions, instanceName?: string): Promise<SendMessageResult> {
        try {
            const instance = resolveInstance(instanceName, this.config);

            // Normalize base64 if not a URL
            const normalizedOptions = {
                ...options,
                video: isUrl(options.video) ? options.video : normalizeBase64(options.video)
            };

            const response = await this.http.post<SendMessageResult>(
                `/message/sendPtv/${instance}`,
                normalizedOptions,
                { params: { instance } }
            );
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }
}

export default MessageController;
