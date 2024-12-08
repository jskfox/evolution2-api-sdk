# Evolution2 API SDK

SDK para interactuar con la API de Evolution2.

## Instalación

```bash
npm install evolution2-api-sdk
```

## Uso

```javascript
import Evolution2SDK from 'evolution2-api-sdk';

// Inicializar el SDK
const sdk = new Evolution2SDK({
  host: 'https://tu-api.com',
  apiKey: 'tu-api-key'
});

// Ejemplos de uso

// Instancias
await sdk.instance.connect('instance1');
await sdk.instance.disconnect('instance1');

// Chat
await sdk.chat.sendMessage('instance1', {
  number: '1234567890',
  message: 'Hola mundo'
});

// Grupos
await sdk.group.create('instance1', {
  name: 'Mi Grupo',
  participants: ['1234567890']
});

// Perfiles
await sdk.profile.getProfile('instance1');

// Configuración
await sdk.settings.getSettings('instance1');
```

## Configuración

Puedes cambiar la configuración en cualquier momento:

```javascript
// Cambiar API Key
sdk.setApiKey('nueva-api-key');

// Cambiar URL base
sdk.setBaseURL('https://nueva-api.com');
```

## Licencia

ISC
