/**
 * Media utility functions for Evolution2 API SDK
 * Funciones utilitarias para el SDK de Evolution2 API
 */

/**
 * Normalizes a base64 string by removing the data URI prefix if present.
 * Evolution API expects raw base64 without the "data:...;base64," prefix.
 * 
 * Normaliza una cadena base64 removiendo el prefijo data URI si está presente.
 * Evolution API espera base64 puro sin el prefijo "data:...;base64,".
 * 
 * @param input - Base64 string, possibly with data URI prefix
 * @returns Raw base64 string without prefix
 * 
 * @example
 * // With prefix - gets stripped
 * normalizeBase64('data:image/png;base64,iVBORw0KGgo...')
 * // Returns: 'iVBORw0KGgo...'
 * 
 * @example
 * // Already raw - unchanged
 * normalizeBase64('iVBORw0KGgo...')
 * // Returns: 'iVBORw0KGgo...'
 */
export function normalizeBase64(input: string): string {
    if (!input) return input;

    // Match data URI prefix: data:mimetype;base64,
    const dataUriRegex = /^data:[^;]+;base64,/i;
    return input.replace(dataUriRegex, '');
}

/**
 * Checks if a string is a URL (starts with http:// or https://)
 * Verifica si una cadena es una URL (comienza con http:// o https://)
 * 
 * @param input - String to check
 * @returns True if input is a URL
 */
export function isUrl(input: string): boolean {
    if (!input) return false;
    return /^https?:\/\//i.test(input);
}

/**
 * Checks if a string appears to be base64 encoded
 * Verifica si una cadena parece estar codificada en base64
 * 
 * @param input - String to check
 * @returns True if input looks like base64
 */
export function isBase64(input: string): boolean {
    if (!input) return false;

    // Check for data URI prefix
    if (/^data:[^;]+;base64,/i.test(input)) return true;

    // Check if it's valid base64 characters (rough check)
    const base64Regex = /^[A-Za-z0-9+/]+=*$/;
    return base64Regex.test(input) && input.length > 20;
}

/**
 * Recommended media formats for WhatsApp
 * Formatos de medios recomendados para WhatsApp
 */
export const RECOMMENDED_FORMATS = {
    image: ['image/png', 'image/jpeg', 'image/webp'],
    video: ['video/mp4'],
    audio: ['audio/ogg', 'audio/mpeg'],
    document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    sticker: ['image/webp']
} as const;

/**
 * Maximum recommended file sizes (in bytes)
 * Tamaños máximos recomendados de archivo (en bytes)
 */
export const MAX_FILE_SIZES = {
    image: 5 * 1024 * 1024,      // 5MB
    video: 16 * 1024 * 1024,     // 16MB
    audio: 16 * 1024 * 1024,     // 16MB
    document: 100 * 1024 * 1024, // 100MB
    sticker: 500 * 1024          // 500KB
} as const;

/**
 * Validates media type value
 * Valida el valor del tipo de media
 * 
 * @param mediatype - Media type to validate
 * @returns True if valid media type
 */
export function isValidMediaType(mediatype: string): mediatype is 'image' | 'video' | 'document' {
    return ['image', 'video', 'document'].includes(mediatype);
}
