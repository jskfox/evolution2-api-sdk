import { HttpClient } from '../http-common';
import { BaseControllerConfig, handleApiError, resolveInstance } from '../types/base';
import { LabelInfo, HandleLabelResult } from '../types/response';

export type LabelAction = 'add' | 'remove';

export interface Label {
    id: string;
    name: string;
    color: number;
    predefinedId?: string;
}

export interface HandleLabelOptions {
    number: string;
    labelId: string;
    action: LabelAction;
}

/**
 * Controller for managing labels
 * Controlador para gestionar etiquetas
 */
class LabelController {
    private http: HttpClient;
    private config: BaseControllerConfig;

    constructor(config: BaseControllerConfig) {
        this.http = config.http;
        this.config = config;
    }

    /** Find all labels / Obtener todas las etiquetas */
    async findLabels(instanceName?: string): Promise<Label[]> {
        try {
            const instance = resolveInstance(instanceName, this.config);
            return await this.http.get<Label[]>(`/label/findLabels/${instance}`, { instance });
        } catch (error) {
            handleApiError(error);
        }
    }

    /** Add or remove a label / Agregar o eliminar una etiqueta */
    async handleLabel(options: HandleLabelOptions, instanceName?: string): Promise<any> {
        try {
            const instance = resolveInstance(instanceName, this.config);
            return await this.http.post(`/label/handleLabel/${instance}`, options, { instance });
        } catch (error) {
            handleApiError(error);
        }
    }
}

export default LabelController;
