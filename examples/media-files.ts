/**
 * Media Files Examples / Ejemplos de Archivos Media
 * 
 * This file demonstrates how to send local files as base64.
 * Este archivo demuestra cómo enviar archivos locales como base64.
 */

import { Evolution2SDK, normalizeBase64, isUrl, RECOMMENDED_FORMATS } from '../src';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
function loadEnv() {
    const envPath = path.join(__dirname, '..', '.env');
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf-8');
        content.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split('=');
            if (key && valueParts.length) {
                let value = valueParts.join('=').trim();
                value = value.split('#')[0].trim();
                value = value.replace(/^["']|["']$/g, '');
                process.env[key.trim()] = value;
            }
        });
    }
}

loadEnv();

const CONFIG = {
    host: process.env.EVOLUTION_HOST || '',
    apiKey: process.env.EVOLUTION_API_KEY || '',
    instanceName: process.env.EVOLUTION_INSTANCE || '',
    testNumber: process.env.TEST_NUMBER || ''
};

const client = new Evolution2SDK(CONFIG);

/**
 * Helper to read file and convert to base64
 * Función auxiliar para leer archivo y convertir a base64
 */
function fileToBase64(filePath: string): string {
    const absolutePath = path.resolve(filePath);
    if (!fs.existsSync(absolutePath)) {
        throw new Error(`File not found: ${absolutePath}`);
    }
    const buffer = fs.readFileSync(absolutePath);
    return buffer.toString('base64');
}

/**
 * Get mimetype from file extension
 * Obtener mimetype desde extensión de archivo
 */
function getMimeType(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes: Record<string, string> = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.mp4': 'video/mp4',
        '.mp3': 'audio/mpeg',
        '.ogg': 'audio/ogg',
        '.pdf': 'application/pdf',
        '.doc': 'application/msword',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    };
    return mimeTypes[ext] || 'application/octet-stream';
}

async function main() {
    console.log('🚀 Evolution2 SDK - Media Files Examples\n');

    // Show recommended formats
    console.log('📋 Recommended formats:');
    console.log('   Image:', RECOMMENDED_FORMATS.image.join(', '));
    console.log('   Video:', RECOMMENDED_FORMATS.video.join(', '));
    console.log('   Audio:', RECOMMENDED_FORMATS.audio.join(', '));
    console.log();

    // Example 1: Send local image
    console.log('1. Sending local image...');
    const imagePath = './my-image.png'; // Change to your file

    if (fs.existsSync(imagePath)) {
        const imageBase64 = fileToBase64(imagePath);
        console.log(`   File size: ${(imageBase64.length * 0.75 / 1024).toFixed(1)} KB`);

        await client.message.sendMedia({
            number: CONFIG.testNumber,
            mediatype: 'image',
            media: imageBase64, // SDK auto-strips data: prefix if present
            mimetype: getMimeType(imagePath),
            fileName: path.basename(imagePath),
            caption: '📷 Local image'
        });
        console.log('   ✅ Image sent');
    } else {
        console.log(`   ⏭️ Skipped (file not found: ${imagePath})`);
    }

    // Example 2: Send audio (voice note)
    console.log('\n2. Sending audio file...');
    const audioPath = './example.ogg'; // Change to your file

    if (fs.existsSync(audioPath)) {
        const audioBase64 = fileToBase64(audioPath);
        console.log(`   File size: ${(audioBase64.length * 0.75 / 1024).toFixed(1)} KB`);

        await client.message.sendWhatsAppAudio({
            number: CONFIG.testNumber,
            audio: audioBase64,
            encoding: true
        });
        console.log('   ✅ Audio sent');
    } else {
        console.log(`   ⏭️ Skipped (file not found: ${audioPath})`);
    }

    // Example 3: Send video
    console.log('\n3. Sending video file...');
    const videoPath = './example.mp4'; // Change to your file

    if (fs.existsSync(videoPath)) {
        const videoBase64 = fileToBase64(videoPath);
        console.log(`   File size: ${(videoBase64.length * 0.75 / 1024 / 1024).toFixed(2)} MB`);

        await client.message.sendMedia({
            number: CONFIG.testNumber,
            mediatype: 'video',
            media: videoBase64,
            mimetype: 'video/mp4',
            fileName: path.basename(videoPath),
            caption: '🎥 Local video'
        });
        console.log('   ✅ Video sent');
    } else {
        console.log(`   ⏭️ Skipped (file not found: ${videoPath})`);
    }

    // Example 4: Using helper functions
    console.log('\n4. Using helper functions...');

    const inputs = [
        'https://example.com/image.jpg',
        'data:image/png;base64,iVBORw0KGgo...',
        'iVBORw0KGgo...'
    ];

    inputs.forEach((input, i) => {
        const type = isUrl(input) ? 'URL' : 'base64';
        const normalized = isUrl(input) ? input : normalizeBase64(input);
        console.log(`   Input ${i + 1}: ${type}`);
        console.log(`   Normalized length: ${normalized.length} chars`);
    });

    console.log('\n✅ All examples completed!');
}

main().catch(console.error);
