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
                `/message/sendText/:instance`,
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
     */
    async sendMedia(options: MediaMessageOptions, instanceName?: string): Promise<SendMessageResult> {
        try {
            const instance = resolveInstance(instanceName, this.config);
            const response = await this.http.post<SendMessageResult>(
                `/message/sendMedia/:instance`,
                options,
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
     */
    async sendWhatsAppAudio(options: AudioMessageOptions, instanceName?: string): Promise<SendMessageResult> {
        try {
            const instance = resolveInstance(instanceName, this.config);
            const response = await this.http.post<SendMessageResult>(
                `/message/sendWhatsAppAudio/:instance`,
                options,
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
     */
    async sendSticker(options: StickerMessageOptions, instanceName?: string): Promise<SendMessageResult> {
        try {
            const instance = resolveInstance(instanceName, this.config);
            const response = await this.http.post<SendMessageResult>(
                `/message/sendSticker/:instance`,
                options,
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
                `/message/sendLocation/:instance`,
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
                `/message/sendContact/:instance`,
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
                `/message/sendReaction/:instance`,
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
                `/message/sendPoll/:instance`,
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
                `/message/sendList/:instance`,
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
                `/message/sendButtons/:instance`,
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
                `/message/sendStatus/:instance`,
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
     */
    async sendPtv(options: PtvMessageOptions, instanceName?: string): Promise<SendMessageResult> {
        try {
            const instance = resolveInstance(instanceName, this.config);
            const response = await this.http.post<SendMessageResult>(
                `/message/sendPtv/:instance`,
                options,
                { params: { instance } }
            );
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }
}

export default MessageController;
