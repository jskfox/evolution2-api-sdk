# Evolution2 API SDK

Un SDK moderno en TypeScript para Evolution API v2, que facilita la integración de WhatsApp en aplicaciones Node.js y Next.js.

[![npm version](https://badge.fury.io/js/evolution2-api-sdk.svg)](https://www.npmjs.com/package/evolution2-api-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ¿Por qué este SDK?

- **Configúralo una vez, úsalo en todas partes** - Define el nombre de tu instancia una sola vez en el constructor, sin necesidad de repetirlo en cada llamada
- **Completamente tipado** - Soporte completo de TypeScript con IntelliSense para todos los métodos y opciones
- **Async/await moderno** - API limpia basada en promesas que se siente natural
- **Flexible** - Sobrescribe la instancia por defecto cuando lo necesites, perfecto para escenarios multi-instancia
- **Completo** - Más de 60 métodos cubriendo todos los endpoints de Evolution API v2.3

## Instalación

```bash
npm install evolution2-api-sdk
```

## Inicio Rápido

```typescript
import { Evolution2SDK } from 'evolution2-api-sdk';

const client = new Evolution2SDK({
  host: 'https://tu-evolution-api.com',
  apiKey: 'tu-api-key',
  instanceName: 'mi-whatsapp'
});

// Envía un mensaje - no necesitas especificar la instancia nuevamente
await client.message.sendText({
  number: '5511999999999',
  text: '¡Hola desde Evolution SDK!'
});
```

## Características Principales

### Tipos de Mensajes

Envía cualquier tipo de mensaje de WhatsApp con métodos simples e intuitivos:

```typescript
// Texto con vista previa de enlaces
await client.message.sendText({
  number: '5511999999999',
  text: 'Mira esto: https://ejemplo.com',
  linkPreview: true
});

// Multimedia (imágenes, videos, documentos)
await client.message.sendMedia({
  number: '5511999999999',
  mediatype: 'image',
  media: 'https://ejemplo.com/foto.jpg',
  caption: 'Hermoso atardecer'
});

// Listas interactivas
await client.message.sendList({
  number: '5511999999999',
  title: 'Nuestro Menú',
  description: 'Elige tu favorito',
  buttonText: 'Ver Menú',
  sections: [{
    title: 'Platos Principales',
    rows: [
      { title: 'Pizza', description: 'Margarita', rowId: '1' },
      { title: 'Hamburguesa', description: 'Clásica de res', rowId: '2' }
    ]
  }]
});
```

### Gestión de Instancias

```typescript
// Crear una nueva instancia
const instance = await client.instance.create({
  instanceName: 'bot-ventas',
  integration: 'WHATSAPP-BAILEYS',
  qrcode: true
});

// Obtener código QR para conexión
const connection = await client.instance.connect();
console.log(connection.base64);

// Verificar estado de conexión
const state = await client.instance.connectionState();
console.log(state.state);
```

### Operaciones de Chat

```typescript
// Obtener todos los chats
const chats = await client.chat.findChats();

// Marcar mensajes como leídos
await client.chat.markAsRead({
  readMessages: [{
    remoteJid: '5511999999999@s.whatsapp.net',
    fromMe: false,
    id: 'MESSAGE_ID'
  }]
});

// Enviar indicador de escritura
await client.chat.sendPresence({
  number: '5511999999999',
  presence: 'composing',
  delay: 2000
});
```

### Gestión de Grupos

```typescript
// Crear un grupo
const group = await client.group.create({
  subject: 'Equipo del Proyecto',
  description: 'Nuestro proyecto increíble',
  participants: ['5511999999999', '5511888888888']
});

// Agregar participantes
await client.group.updateParticipant(group.id, {
  action: 'add',
  participants: ['5511777777777']
});

// Obtener enlace de invitación
const invite = await client.group.fetchInviteCode(group.id);
```

## Controladores Disponibles

| Controlador | Métodos | Propósito |
|-------------|---------|-----------|
| `instance` | 8 | Crear, conectar y gestionar instancias de WhatsApp |
| `message` | 12 | Enviar todos los tipos de mensajes (texto, multimedia, encuestas, etc) |
| `chat` | 14 | Operaciones de chat, contactos, gestión de mensajes |
| `group` | 14 | Gestión completa de grupos |
| `profile` | 8 | Configuración de perfil y privacidad |
| `settings` | 11 | Configuración de instancia |
| `label` | 2 | Gestión de etiquetas |
| `websocket` | 2 | Configuración de eventos websocket |

**Total: 71 métodos** - Consulta la [documentación completa](./DOCUMENTATION.es.md) para detalles de cada método.

## Manejo de Errores

El SDK lanza errores descriptivos que puedes capturar y manejar:

```typescript
try {
  await client.message.sendText({
    number: 'invalido',
    text: 'Hola'
  });
} catch (error) {
  console.error('Error al enviar mensaje:', error.message);
}
```

## Eventos Websocket

Configura qué eventos quieres recibir vía websocket:

```typescript
await client.websocket.set({
  websocket: {
    enabled: true,
    events: [
      'MESSAGES_UPSERT',
      'CONNECTION_UPDATE',
      'MESSAGES_UPDATE',
      'PRESENCE_UPDATE'
    ]
  }
});
```

## Configuración Dinámica

Cambia la configuración al vuelo sin recrear el cliente:

```typescript
// Cambiar a una instancia diferente
client.setInstance('otra-instancia');

// Actualizar credenciales de API
client.setApiKey('nueva-api-key');
client.setBaseURL('https://nuevo-servidor.com');
```

## Soporte TypeScript

Todos los métodos y opciones están completamente tipados. Importa los tipos según necesites:

```typescript
import { 
  TextMessageOptions,
  MediaMessageOptions,
  Evolution2SDK 
} from 'evolution2-api-sdk';
```

Consulta [DOCUMENTATION.es.md](./DOCUMENTATION.es.md) para definiciones completas de tipos.

## Requisitos

- Node.js 14 o superior
- Evolution API v2.3+
- TypeScript 4.5+ (para proyectos TypeScript)

## Documentación

- [Documentación Completa de la API](./DOCUMENTATION.es.md) - Guía detallada de cada método
- [Documentación de Evolution API](https://doc.evolution-api.com) - Documentación oficial de Evolution API

## Contribuciones

¡Las contribuciones son bienvenidas! No dudes en abrir issues o enviar pull requests.

## Licencia

Licencia MIT - consulta el archivo LICENSE para más detalles.

## Créditos

Creado y mantenido por [Jorge Solano Kirk](https://github.com/jskfox).

Basado en [Evolution Manager](https://github.com/EvolutionAPI/evolution-manager) por Gabriel Pastori.

## Soporte

- **Issues**: [GitHub Issues](https://github.com/jskfox/evolution2-api-sdk/issues)
- **NPM**: [evolution2-api-sdk](https://www.npmjs.com/package/evolution2-api-sdk)
