/**
 * Basic Usage Examples / Ejemplos de Uso Básico
 * 
 * This file demonstrates the most common SDK operations.
 * Este archivo demuestra las operaciones más comunes del SDK.
 */

import { Evolution2SDK } from '../src';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables / Cargar variables de entorno
function loadEnv() {
    const envPath = path.join(__dirname, '..', '.env');
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf-8');
        content.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split('=');
            if (key && valueParts.length) {
                let value = valueParts.join('=').trim();
                // Remove inline comments
                value = value.split('#')[0].trim();
                // Remove quotes
                value = value.replace(/^["']|["']$/g, '');
                process.env[key.trim()] = value;
            }
        });
    }
}

loadEnv();

// Configuration / Configuración
const CONFIG = {
    host: process.env.EVOLUTION_HOST || '',
    apiKey: process.env.EVOLUTION_API_KEY || '',
    instanceName: process.env.EVOLUTION_INSTANCE || '',
    testNumber: process.env.TEST_NUMBER || ''
};

// Initialize SDK / Inicializar SDK
const client = new Evolution2SDK({
    host: CONFIG.host,
    apiKey: CONFIG.apiKey,
    instanceName: CONFIG.instanceName
});

async function main() {
    console.log('🚀 Evolution2 SDK - Basic Usage Examples\n');

    // Check connection / Verificar conexión
    console.log('1. Checking connection...');
    const state = await client.instance.connectionState();
    console.log(`   Status: ${state.instance.state}`);

    if (state.instance.state !== 'open') {
        console.log('❌ Instance not connected. Please connect first.');
        return;
    }

    // Send text message / Enviar mensaje de texto
    console.log('\n2. Sending text message...');
    await client.message.sendText({
        number: CONFIG.testNumber,
        text: '👋 Hello from Evolution2 SDK!',
        delay: 1000
    });
    console.log('   ✅ Text message sent');

    // Send image from URL / Enviar imagen desde URL
    console.log('\n3. Sending image from URL...');
    await client.message.sendMedia({
        number: CONFIG.testNumber,
        mediatype: 'image',
        media: 'https://picsum.photos/400/300',
        caption: '📸 Image from URL'
    });
    console.log('   ✅ Image sent');

    // Send location / Enviar ubicación
    console.log('\n4. Sending location...');
    await client.message.sendLocation({
        number: CONFIG.testNumber,
        latitude: 40.7128,
        longitude: -74.0060,
        name: 'New York City',
        address: 'Manhattan, NY, USA'
    });
    console.log('   ✅ Location sent');

    // Send contact / Enviar contacto
    console.log('\n5. Sending contact...');
    await client.message.sendContact({
        number: CONFIG.testNumber,
        contact: [{
            fullName: 'John Doe',
            wuid: '5511999999999',
            phoneNumber: '+55 11 99999-9999'
        }]
    });
    console.log('   ✅ Contact sent');

    // Get chats / Obtener chats
    console.log('\n6. Fetching chats...');
    const chats = await client.chat.findChats();
    console.log(`   Found ${chats?.length || 0} chats`);

    console.log('\n✅ All examples completed!');
}

main().catch(console.error);
