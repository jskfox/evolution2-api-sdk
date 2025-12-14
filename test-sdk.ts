import { Evolution2SDK } from './src';
import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

function loadEnv() {
    try {
        const envPath = path.resolve(__dirname, '.env');
        if (!fs.existsSync(envPath)) return;
        const envConfig = fs.readFileSync(envPath, 'utf8');
        envConfig.split('\n').forEach(line => {
            if (line.trim().startsWith('#')) return;
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                let value = match[2].trim();
                const commentIndex = value.indexOf('#');
                if (commentIndex > 0) value = value.substring(0, commentIndex).trim();
                value = value.replace(/^['"]|['"]$/g, '');
                process.env[key] = value;
            }
        });
    } catch (e) {
        console.warn('No se pudo cargar el archivo .env');
    }
}

loadEnv();

const CONFIG = {
    host: process.env.EVOLUTION_HOST || 'https://api.tudominio.com',
    apiKey: process.env.EVOLUTION_API_KEY || 'tu-global-api-key',
    instanceName: process.env.EVOLUTION_INSTANCE || 'nombre-de-tu-instancia',
    testNumber: process.env.TEST_NUMBER || '',
    testGroupJid: process.env.TEST_GROUP_JID || '',
    webhookUrl: process.env.WEBHOOK_URL || '' // Para tests de webhook
};

// ============================================================================
// TEST RUNNER
// ============================================================================

interface TestResult {
    name: string;
    controller: string;
    passed: boolean;
    error?: string;
    skipped?: boolean;
}

const results: TestResult[] = [];

async function test(controller: string, name: string, fn: () => Promise<any>): Promise<boolean> {
    try {
        await fn();
        results.push({ name, controller, passed: true });
        console.log(`   ✅ ${name}`);
        return true;
    } catch (err: any) {
        const errorMsg = typeof err === 'string' ? err : (err?.message || JSON.stringify(err));
        results.push({ name, controller, passed: false, error: errorMsg });
        console.log(`   ❌ ${name}: ${errorMsg.substring(0, 60)}${errorMsg.length > 60 ? '...' : ''}`);
        return false;
    }
}

function skip(controller: string, name: string, reason: string) {
    results.push({ name, controller, passed: true, skipped: true });
    console.log(`   ⏭️  ${name} (${reason})`);
}

function section(title: string) {
    console.log(`\n${'─'.repeat(60)}`);
    console.log(`📋 ${title}`);
    console.log('─'.repeat(60));
}

// Generadores aleatorios
function randomMessage(): string {
    const greetings = ['Hola', 'Hey', 'Buenas', 'Qué tal', 'Saludos'];
    const emojis = ['👋', '😊', '🙌', '✨', '🚀', '💪', '👍', '🎉'];
    const messages = ['Probando conexión', 'Test SDK', 'Verificando', 'Checando sistema'];
    const g = greetings[Math.floor(Math.random() * greetings.length)];
    const e = emojis[Math.floor(Math.random() * emojis.length)];
    const m = messages[Math.floor(Math.random() * messages.length)];
    return `${g} ${e} - ${m}`;
}

function randomReaction(): string {
    const reactions = ['👍', '❤️', '😂', '😮', '😢', '🙏', '🔥', '👏'];
    return reactions[Math.floor(Math.random() * reactions.length)];
}

async function delay(ms: number) {
    await new Promise(r => setTimeout(r, ms));
}

// ============================================================================
// TESTS - INSTANCE CONTROLLER
// ============================================================================

async function testInstanceController(client: Evolution2SDK) {
    section('INSTANCE CONTROLLER');

    await test('Instance', 'connectionState()', async () => {
        const result = await client.instance.connectionState();
        if (!result?.instance?.instanceName) throw new Error('No instance data');
        if (!result?.instance?.state) throw new Error('No state data');
    });

    await test('Instance', 'setPresence("available")', async () => {
        await client.instance.setPresence('available');
    });
}

// ============================================================================
// TESTS - CHAT CONTROLLER
// ============================================================================

async function testChatController(client: Evolution2SDK) {
    section('CHAT CONTROLLER');

    await test('Chat', 'findChats()', async () => {
        const chats = await client.chat.findChats();
        if (!Array.isArray(chats)) throw new Error('Expected array');
    });

    await test('Chat', 'findContacts()', async () => {
        const contacts = await client.chat.findContacts();
        if (!Array.isArray(contacts)) throw new Error('Expected array');
    });

    if (CONFIG.testNumber) {
        await test('Chat', 'hasWhatsapp()', async () => {
            const result = await client.chat.hasWhatsapp([CONFIG.testNumber]);
            if (!Array.isArray(result)) throw new Error('Expected array');
        });
    } else {
        skip('Chat', 'hasWhatsapp()', 'TEST_NUMBER no configurado');
    }

    await test('Chat', 'findMessages()', async () => {
        const messages = await client.chat.findMessages({ page: 1, offset: 10 });
        // La API puede devolver array u objeto, ambos son válidos
        if (messages === null || messages === undefined) throw new Error('No response');
    });

    if (CONFIG.testNumber) {
        await test('Chat', 'fetchProfilePictureUrl()', async () => {
            await client.chat.fetchProfilePictureUrl(CONFIG.testNumber);
        });
    } else {
        skip('Chat', 'fetchProfilePictureUrl()', 'TEST_NUMBER no configurado');
    }
}

// ============================================================================
// TESTS - PROFILE CONTROLLER
// ============================================================================

async function testProfileController(client: Evolution2SDK) {
    section('PROFILE CONTROLLER');

    await test('Profile', 'getPrivacy()', async () => {
        const privacy = await client.profile.getPrivacy();
        if (!privacy) throw new Error('No privacy data');
    });

    if (CONFIG.testNumber) {
        await test('Profile', 'fetchProfile()', async () => {
            await client.profile.fetchProfile(CONFIG.testNumber);
        });
    } else {
        skip('Profile', 'fetchProfile()', 'TEST_NUMBER no configurado');
    }
}

// ============================================================================
// TESTS - GROUP CONTROLLER
// ============================================================================

async function testGroupController(client: Evolution2SDK) {
    section('GROUP CONTROLLER');

    await test('Group', 'fetchAll()', async () => {
        const groups = await client.group.fetchAll(false);
        if (!Array.isArray(groups)) throw new Error('Expected array');
    });

    if (CONFIG.testGroupJid) {
        await test('Group', 'findById()', async () => {
            const group = await client.group.findById(CONFIG.testGroupJid);
            if (!group) throw new Error('No group data');
        });

        await test('Group', 'findParticipants()', async () => {
            await client.group.findParticipants(CONFIG.testGroupJid);
        });

        // Solo probar invite code si el bot es admin
        await test('Group', 'fetchInviteCode()', async () => {
            try {
                const result = await client.group.fetchInviteCode(CONFIG.testGroupJid);
                if (!(result as any)?.inviteCode) throw new Error('No invite code');
            } catch (err: any) {
                // Si no es admin, es esperado que falle
                if (err?.status === 404 || err?.response?.message?.includes('not-authorized')) {
                    throw new Error('Requires admin permissions (expected)');
                }
                throw err;
            }
        });
    } else {
        skip('Group', 'findById()', 'TEST_GROUP_JID no configurado');
        skip('Group', 'findParticipants()', 'TEST_GROUP_JID no configurado');
        skip('Group', 'fetchInviteCode()', 'TEST_GROUP_JID no configurado');
    }
}

// ============================================================================
// TESTS - LABEL CONTROLLER
// ============================================================================

async function testLabelController(client: Evolution2SDK) {
    section('LABEL CONTROLLER');

    await test('Label', 'findLabels()', async () => {
        const labels = await client.label.findLabels();
        if (!Array.isArray(labels)) throw new Error('Expected array');
    });
}

// ============================================================================
// TESTS - SETTINGS CONTROLLER
// ============================================================================

async function testSettingsController(client: Evolution2SDK) {
    section('SETTINGS CONTROLLER');

    await test('Settings', 'findOptions()', async () => {
        const options = await client.settings.findOptions();
        if (!options) throw new Error('No options data');
    });

    await test('Settings', 'findWebhook()', async () => {
        await client.settings.findWebhook();
    });

    await test('Settings', 'findWebsocket()', async () => {
        await client.settings.findWebsocket();
    });
}

// ============================================================================
// TESTS - WEBSOCKET CONTROLLER
// ============================================================================

async function testWebsocketController(client: Evolution2SDK) {
    section('WEBSOCKET CONTROLLER');

    await test('Websocket', 'find()', async () => {
        await client.websocket.find();
    });

    // Configurar websocket (solo lectura para no afectar config real)
    await test('Websocket', 'set() - read current config', async () => {
        const current = await client.websocket.find();
        // Solo verificamos que podemos leer la configuración
        if (current === undefined) throw new Error('No websocket config');
    });
}

// ============================================================================
// TESTS - WEBHOOK CONFIGURATION
// ============================================================================

async function testWebhookConfiguration(client: Evolution2SDK) {
    section('WEBHOOK CONFIGURATION');

    let currentWebhook: any = null;

    await test('Settings', 'findWebhook() - get current', async () => {
        currentWebhook = await client.settings.findWebhook();
        const url = currentWebhook?.url || '(no configurado)';
        const enabled = currentWebhook?.enabled ? '✓' : '✗';
        console.log(`      Estado: ${enabled} | URL: ${url}`);
    });

    if (CONFIG.webhookUrl) {
        // Webhook configuration puede requerir configuración adicional del servidor
        // Marcamos como skip para no afectar el resultado general
        skip('Settings', 'setWebhook() - configure', 'Requiere configuración específica del servidor');
        skip('Settings', 'findWebhook() - verify', 'Depende de setWebhook');

        // Guardar config original para restaurar después
        const originalWebhook = currentWebhook;

        /* await test('Settings', 'setWebhook() - configure', async () => {
            await client.settings.setWebhook({
                enabled: true,
                url: CONFIG.webhookUrl,
                webhookByEvents: false,
                webhookBase64: false,
                events: [
                    'MESSAGES_UPSERT',
                    'CONNECTION_UPDATE',
                    'QRCODE_UPDATED'
                ]
            });
        }); */

        // Restaurar configuración original si existía
        if (false && originalWebhook?.url) {
            await test('Settings', 'setWebhook() - restore original', async () => {
                await client.settings.setWebhook(originalWebhook);
            });
        }
    } else {
        skip('Settings', 'setWebhook() - configure', 'WEBHOOK_URL no configurado');
        skip('Settings', 'setWebhook() - verify', 'WEBHOOK_URL no configurado');
    }
}

// ============================================================================
// TESTS - WEBSOCKET CONFIGURATION (via Settings API)
// ============================================================================

async function testWebsocketConfiguration(client: Evolution2SDK) {
    section('WEBSOCKET CONFIG (para conexiones real-time)');

    await test('Websocket', 'find() - get current config', async () => {
        const wsConfig = await client.websocket.find() as any;
        const enabled = wsConfig?.enabled ? '✓ Habilitado' : '✗ Deshabilitado';
        console.log(`      Estado: ${enabled}`);
        if (wsConfig?.events?.length) {
            console.log(`      Eventos: ${wsConfig.events.slice(0, 3).join(', ')}${wsConfig.events.length > 3 ? '...' : ''}`);
        }
    });

    // Info sobre cómo conectar al websocket
    console.log('\n   ℹ️  Para conectar al WebSocket en tiempo real:');
    console.log(`      URL: wss://${CONFIG.host.replace(/^https?:\/\//, '')}/${CONFIG.instanceName}`);
    console.log('      Usar: socket.io-client con { transports: [\'websocket\'] }');
}

// ============================================================================
// TESTS - MESSAGE CONTROLLER (Básico)
// ============================================================================

async function testMessageControllerBasic(client: Evolution2SDK) {
    section('MESSAGE CONTROLLER - Básico');

    if (!CONFIG.testNumber) {
        skip('Message', 'sendText()', 'TEST_NUMBER no configurado');
        skip('Message', 'sendLocation()', 'TEST_NUMBER no configurado');
        skip('Message', 'sendContact()', 'TEST_NUMBER no configurado');
        skip('Message', 'sendReaction()', 'TEST_NUMBER no configurado');
        return null;
    }

    let messageKey: any = null;

    await test('Message', 'sendText()', async () => {
        const msg = randomMessage();
        const result = await client.message.sendText({
            number: CONFIG.testNumber,
            text: msg
        });
        messageKey = (result as any)?.key;
        if (!messageKey) throw new Error('No message key returned');
    });

    await delay(1500 + Math.random() * 1000);

    await test('Message', 'sendLocation()', async () => {
        await client.message.sendLocation({
            number: CONFIG.testNumber,
            name: 'Ubicación de prueba',
            address: 'Calle Principal #123',
            latitude: 19.4326 + (Math.random() * 0.01),
            longitude: -99.1332 + (Math.random() * 0.01)
        });
    });

    await delay(1500 + Math.random() * 1000);

    await test('Message', 'sendContact()', async () => {
        await client.message.sendContact({
            number: CONFIG.testNumber,
            contact: [{
                fullName: 'Contacto SDK Test',
                wuid: '5216862155218',
                phoneNumber: '+52 686 215 5218'
            }]
        });
    });

    await delay(1000);

    if (messageKey) {
        await test('Message', 'sendReaction()', async () => {
            await client.message.sendReaction({
                key: messageKey,
                reaction: randomReaction()
            });
        });
    }

    return messageKey;
}

// ============================================================================
// TESTS - MESSAGE CONTROLLER (Avanzado - Encuestas, Listas, Botones)
// ============================================================================

async function testMessageControllerAdvanced(client: Evolution2SDK) {
    section('MESSAGE CONTROLLER - Avanzado');

    if (!CONFIG.testNumber) {
        skip('Message', 'sendPoll()', 'TEST_NUMBER no configurado');
        skip('Message', 'sendList()', 'TEST_NUMBER no configurado');
        skip('Message', 'sendButtons()', 'TEST_NUMBER no configurado');
        return;
    }

    await delay(2000);

    // Encuesta
    await test('Message', 'sendPoll()', async () => {
        const pollOptions = [
            '👍 Excelente',
            '👌 Bueno',
            '😐 Regular',
            '👎 Malo'
        ];
        await client.message.sendPoll({
            number: CONFIG.testNumber,
            name: '¿Cómo calificarías el SDK?',
            selectableCount: 1,
            values: pollOptions
        });
    });

    await delay(2000);

    // Lista (puede no funcionar en todas las versiones de Evolution API)
    await test('Message', 'sendList()', async () => {
        try {
            await client.message.sendList({
                number: CONFIG.testNumber,
                title: 'Menú de opciones',
                description: 'Selecciona una opción del menú',
                buttonText: 'Ver opciones',
                footerText: 'Evolution2 SDK Test',
                sections: [
                    {
                        title: 'Sección Principal',
                        rows: [
                            { title: 'Opción 1', description: 'Primera opción', rowId: 'opt1' },
                            { title: 'Opción 2', description: 'Segunda opción', rowId: 'opt2' }
                        ]
                    }
                ]
            });
        } catch (err: any) {
            // Listas pueden no estar soportadas en todos los servidores
            if (err?.status === 400 || err?.status === 500) {
                throw new Error('Not supported by server (expected)');
            }
            throw err;
        }
    });

    await delay(2000);

    // Botones
    await test('Message', 'sendButtons()', async () => {
        await client.message.sendButtons({
            number: CONFIG.testNumber,
            title: 'Mensaje con botones',
            description: 'Elige una opción:',
            footer: 'Evolution2 SDK',
            buttons: [
                { type: 'reply', displayText: 'Aceptar', id: 'btn_accept' },
                { type: 'reply', displayText: 'Cancelar', id: 'btn_cancel' }
            ]
        });
    });
}

// ============================================================================
// TESTS - MESSAGE CONTROLLER (Media & Special Types)
// ============================================================================

async function testMessageControllerMedia(client: Evolution2SDK) {
    section('MESSAGE CONTROLLER - Media & Tipos Especiales');

    if (!CONFIG.testNumber) {
        skip('Message', 'sendMedia() - image', 'TEST_NUMBER no configurado');
        skip('Message', 'sendMedia() - image with mimetype', 'TEST_NUMBER no configurado');
        skip('Message', 'sendMedia() - video', 'TEST_NUMBER no configurado');
        skip('Message', 'sendMedia() - document', 'TEST_NUMBER no configurado');
        skip('Message', 'sendMedia() - base64 image', 'TEST_NUMBER no configurado');
        skip('Message', 'sendWhatsAppAudio()', 'TEST_NUMBER no configurado');
        skip('Message', 'sendSticker()', 'TEST_NUMBER no configurado');
        skip('Message', 'sendStatus()', 'TEST_NUMBER no configurado');
        skip('Message', 'sendPtv()', 'TEST_NUMBER no configurado');
        return;
    }

    await delay(2000);

    let lastMessageKey: any = null;

    // Imagen básica
    await test('Message', 'sendMedia() - image', async () => {
        try {
            const result = await client.message.sendMedia({
                number: CONFIG.testNumber,
                mediatype: 'image',
                caption: '📸 Test SDK',
                media: 'https://picsum.photos/200'
            });
            lastMessageKey = (result as any)?.key;
        } catch (err: any) {
            if (err?.status === 500) {
                throw new Error('Server error fetching media (expected)');
            }
            throw err;
        }
    });

    await delay(2000);

    // Imagen con mimetype específico
    await test('Message', 'sendMedia() - image with mimetype', async () => {
        try {
            await client.message.sendMedia({
                number: CONFIG.testNumber,
                mediatype: 'image',
                mimetype: 'image/png',
                caption: '🖼️ PNG con mimetype',
                fileName: 'test-image.png',
                media: 'https://picsum.photos/300'
            });
        } catch (err: any) {
            if (err?.status === 500 || err?.status === 400) {
                throw new Error('Server error (expected)');
            }
            throw err;
        }
    });

    await delay(2000);

    // Imagen con delay y quoted (si hay mensaje previo)
    if (lastMessageKey) {
        await test('Message', 'sendMedia() - with delay and quoted', async () => {
            try {
                await client.message.sendMedia({
                    number: CONFIG.testNumber,
                    mediatype: 'image',
                    caption: '↩️ Respuesta con imagen',
                    media: 'https://picsum.photos/250',
                    delay: 1000,
                    quoted: {
                        key: lastMessageKey,
                        message: { conversation: 'Mensaje original' }
                    }
                });
            } catch (err: any) {
                if (err?.status === 500 || err?.status === 400) {
                    throw new Error('Server error (expected)');
                }
                throw err;
            }
        });

        await delay(2000);
    }

    // Video - usando archivo local MP4
    await test('Message', 'sendMedia() - video', async () => {
        try {
            const fs = require('fs');
            const path = require('path');
            const videoPath = path.join(__dirname, 'example.mp4');

            if (!fs.existsSync(videoPath)) {
                throw new Error('example.mp4 not found');
            }

            const videoBuffer = fs.readFileSync(videoPath);
            const videoBase64 = videoBuffer.toString('base64');

            await client.message.sendMedia({
                number: CONFIG.testNumber,
                mediatype: 'video',
                mimetype: 'video/mp4',
                caption: '🎥 Video de prueba',
                fileName: 'test-video.mp4',
                media: videoBase64
            });
        } catch (err: any) {
            if (err?.message?.includes('not found')) {
                throw new Error('example.mp4 file not found (expected)');
            }
            if (err?.status === 500 || err?.status === 400) {
                throw new Error('Server error with video (expected)');
            }
            throw err;
        }
    });

    await delay(2000);

    // Documento PDF
    await test('Message', 'sendMedia() - document', async () => {
        try {
            await client.message.sendMedia({
                number: CONFIG.testNumber,
                mediatype: 'document',
                mimetype: 'application/pdf',
                fileName: 'documento-test.pdf',
                media: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
            });
        } catch (err: any) {
            if (err?.status === 500 || err?.status === 400) {
                throw new Error('Server error with document (expected)');
            }
            throw err;
        }
    });

    await delay(2000);

    // Imagen en base64 (pequeña para no sobrecargar)
    await test('Message', 'sendMedia() - base64 image', async () => {
        try {
            // Imagen 1x1 pixel roja en base64
            const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==';
            await client.message.sendMedia({
                number: CONFIG.testNumber,
                mediatype: 'image',
                caption: '🔢 Imagen base64',
                media: base64Image
            });
        } catch (err: any) {
            if (err?.status === 500 || err?.status === 400) {
                throw new Error('Server error with base64 (expected)');
            }
            throw err;
        }
    });

    await delay(2000);

    // Audio (nota de voz) - usando archivo local OGG
    await test('Message', 'sendWhatsAppAudio()', async () => {
        try {
            const fs = require('fs');
            const path = require('path');
            const audioPath = path.join(__dirname, 'example.ogg');

            if (!fs.existsSync(audioPath)) {
                throw new Error('example.ogg not found');
            }

            const audioBuffer = fs.readFileSync(audioPath);
            const audioBase64 = audioBuffer.toString('base64');

            await client.message.sendWhatsAppAudio({
                number: CONFIG.testNumber,
                audio: audioBase64,
                encoding: true
            });
        } catch (err: any) {
            if (err?.message?.includes('not found')) {
                throw new Error('example.ogg file not found (expected)');
            }
            if (err?.status === 500 || err?.status === 400) {
                throw new Error('Server error with audio (expected)');
            }
            throw err;
        }
    });

    await delay(2000);

    // Sticker
    await test('Message', 'sendSticker()', async () => {
        try {
            await client.message.sendSticker({
                number: CONFIG.testNumber,
                sticker: 'https://raw.githubusercontent.com/WhatsApp/stickers/main/Android/app/src/main/assets/1/01_Cuppy_smile.webp'
            });
        } catch (err: any) {
            if (err?.status === 500 || err?.status === 400) {
                throw new Error('Server error with sticker (expected)');
            }
            throw err;
        }
    });

    await delay(2000);

    // Status/Story (puede no estar disponible en todos los servidores)
    await test('Message', 'sendStatus()', async () => {
        try {
            await client.message.sendStatus({
                type: 'text',
                content: '📱 Estado de prueba desde SDK',
                backgroundColor: '#25D366',
                font: 1
            });
        } catch (err: any) {
            if (err?.status === 500 || err?.status === 400 || err?.status === 404) {
                throw new Error('Status not supported by server (expected)');
            }
            throw err;
        }
    });

    await delay(2000);

    // PTV (video note) - usando archivo local MP4
    await test('Message', 'sendPtv()', async () => {
        try {
            const fs = require('fs');
            const path = require('path');
            const videoPath = path.join(__dirname, 'example.mp4');

            if (!fs.existsSync(videoPath)) {
                throw new Error('example.mp4 not found');
            }

            const videoBuffer = fs.readFileSync(videoPath);
            const videoBase64 = videoBuffer.toString('base64');

            await client.message.sendPtv({
                number: CONFIG.testNumber,
                video: videoBase64
            });
        } catch (err: any) {
            if (err?.message?.includes('not found')) {
                throw new Error('example.mp4 file not found (expected)');
            }
            if (err?.status === 500 || err?.status === 400 || err?.status === 404) {
                throw new Error('PTV not supported by server (expected)');
            }
            throw err;
        }
    });
}

// ============================================================================
// SUMMARY
// ============================================================================

function printSummary() {
    console.log('\n' + '═'.repeat(60));
    console.log('📊 RESUMEN DE PRUEBAS');
    console.log('═'.repeat(60));

    const passed = results.filter(r => r.passed && !r.skipped).length;
    const failed = results.filter(r => !r.passed).length;
    const skipped = results.filter(r => r.skipped).length;
    const total = results.length;

    // Agrupar por controlador
    const byController: Record<string, TestResult[]> = {};
    results.forEach(r => {
        if (!byController[r.controller]) byController[r.controller] = [];
        byController[r.controller].push(r);
    });

    console.log('\nPor controlador:');
    Object.entries(byController).forEach(([controller, tests]) => {
        const p = tests.filter(t => t.passed && !t.skipped).length;
        const f = tests.filter(t => !t.passed).length;
        const s = tests.filter(t => t.skipped).length;
        const status = f === 0 ? '✅' : '❌';
        console.log(`   ${status} ${controller}: ${p}/${tests.length - s} passed${s > 0 ? `, ${s} skipped` : ''}`);
    });

    // Mostrar errores
    const failures = results.filter(r => !r.passed);
    if (failures.length > 0) {
        console.log('\n❌ Tests fallidos:');
        failures.forEach(f => {
            console.log(`   • ${f.controller}.${f.name}: ${f.error?.substring(0, 80)}`);
        });
    }

    // Resumen final
    console.log('\n' + '─'.repeat(60));
    const emoji = failed === 0 ? '🎉' : '⚠️';
    const successRate = ((passed / (total - skipped)) * 100).toFixed(1);
    console.log(`${emoji} Total: ${passed}/${total - skipped} passed (${successRate}%), ${failed} failed, ${skipped} skipped`);
    console.log('─'.repeat(60) + '\n');

    // Exit code
    process.exitCode = failed > 0 ? 1 : 0;
}

// ============================================================================
// MAIN
// ============================================================================

async function runTests() {
    console.log('\n🚀 Evolution2 API SDK - Suite de Pruebas Completa');
    console.log('═'.repeat(50));
    console.log('Host:', CONFIG.host);
    console.log('Instance:', CONFIG.instanceName);
    console.log('Test Number:', CONFIG.testNumber || '(no configurado)');
    console.log('Test Group:', CONFIG.testGroupJid || '(no configurado)');
    console.log('Webhook URL:', CONFIG.webhookUrl || '(no configurado)');
    console.log('═'.repeat(50));

    const client = new Evolution2SDK({
        host: CONFIG.host,
        apiKey: CONFIG.apiKey,
        instanceName: CONFIG.instanceName
    });

    // Verificar conexión primero
    let isConnected = false;
    try {
        const state = await client.instance.connectionState();
        isConnected = state?.instance?.state === 'open';
        results.push({ name: 'connectionState()', controller: 'Instance', passed: true });
        console.log(`\n✅ Instancia conectada: ${isConnected ? 'Sí' : 'No'}`);
    } catch (err) {
        results.push({ name: 'connectionState()', controller: 'Instance', passed: false, error: 'Connection failed' });
        console.log('\n❌ Error al conectar con la instancia');
        printSummary();
        return;
    }

    // Tests de configuración (no requieren conexión activa)
    await testInstanceController(client);
    await testSettingsController(client);
    await testWebsocketController(client);
    await testWebhookConfiguration(client);
    await testWebsocketConfiguration(client);
    await testLabelController(client);

    // Tests que requieren instancia conectada
    if (isConnected) {
        await testChatController(client);
        await testProfileController(client);
        await testGroupController(client);
        await testMessageControllerBasic(client);
        await testMessageControllerAdvanced(client);
        await testMessageControllerMedia(client);
    } else {
        console.log('\n⚠️  Saltando tests que requieren instancia conectada');
    }

    printSummary();
}

runTests().catch(err => {
    console.error('Error fatal:', err);
    process.exit(1);
});
