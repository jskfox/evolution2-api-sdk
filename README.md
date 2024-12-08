# Evolution2 API SDK

A TypeScript/JavaScript SDK for interacting with Evolution API v2.

## Features

- Full TypeScript support with type definitions
- Modular controller-based architecture
- Promise-based API
- Comprehensive error handling
- Axios-based HTTP client

## Installation

```bash
npm install evolution2-api-sdk
```

## Usage

```typescript
import Evolution2SDK from 'evolution2-api-sdk';

const evoApi = new Evolution2SDK({
  baseURL: 'https://your-api-url.com',
  apiKey: 'globalApiKey',
  // Optionally, you can add other headers here. 
  headers: {
    'your-header': 'value', // For example, 'Bearer your-token'
  }
});

// Instance management
const instances = await evoApi.instance.fetchAll();

// Chat operations
const chats = await evoApi.chat.getAll('instance-name');

// Group management
const groups = await evoApi.group.getAll('instance-name');

// Profile management
await evoApi.profile.updateName('instance-name', 'New Name');
await evoApi.profile.updateStatus('instance-name', 'Hello!');
const privacy = await evoApi.profile.getPrivacy('instance-name');
await evoApi.profile.updatePrivacy('instance-name', privacySettings);

// Settings management
const settings = await evoApi.settings.findOptions('instance-name');
await evoApi.settings.setOptions('instance-name', {
  rejectCalls: true,
  groupsAdminsOnly: false
});
```

## Controllers

- `InstanceController`: Manage WhatsApp instances
- `InstanceChatController`: Handle chat operations
- `InstanceGroupController`: Manage group operations
- `InstanceProfileController`: Handle profile settings
- `InstanceSettingsController`: Manage instance settings

## Type Definitions

All controllers and methods are fully typed. Type definitions are available for:
- Instance configurations and states
- Chat messages and contacts
- Group structures and operations
- Profile settings
- Instance settings
- API responses

## Error Handling

The SDK includes comprehensive error handling with detailed error messages from the API.

---

# Evolution2 API SDK (Español)

SDK en TypeScript/JavaScript para interactuar con Evolution API v2.

## Características

- Soporte completo de TypeScript con definiciones de tipos
- Arquitectura modular basada en controladores
- API basada en Promesas
- Manejo integral de errores
- Cliente HTTP basado en Axios

## Instalación

```bash
npm install evolution2-api-sdk
```

## Uso

```typescript
import Evolution2SDK from 'evolution2-api-sdk';

const evoApi = new Evolution2SDK({
  baseURL: 'https://tu-url-api.com',
  apiKey: 'globalApiKey',
  // Opcionalmente puedes agregar otros encabezados 
  headers: {
    'Nuevo-Encabezado': 'Tu Valor', // Por ejemplo, 'Bearer tu-token'
  }
});

// Gestión de instancias
const instancias = await evoApi.instance.fetchAll();

// Operaciones de chat
const chats = await evoApi.chat.getAll('nombre-instancia');

// Gestión de grupos
const grupos = await evoApi.group.getAll('nombre-instancia');

// Gestión de perfil
await evoApi.profile.updateName('nombre-instancia', 'Nuevo Nombre');
await evoApi.profile.updateStatus('nombre-instancia', '¡Hola!');
const privacidad = await evoApi.profile.getPrivacy('nombre-instancia');
await evoApi.profile.updatePrivacy('nombre-instancia', configuracionPrivacidad);

// Gestión de configuraciones
const configuraciones = await evoApi.settings.findOptions('nombre-instancia');
await evoApi.settings.setOptions('nombre-instancia', {
  rejectCalls: true,
  groupsAdminsOnly: false
});
```

## Controladores

- `InstanceController`: Gestiona instancias de WhatsApp
- `InstanceChatController`: Maneja operaciones de chat
- `InstanceGroupController`: Gestiona operaciones de grupos
- `InstanceProfileController`: Maneja configuraciones de perfil
- `InstanceSettingsController`: Gestiona configuraciones de instancia

## Definiciones de Tipos

Todos los controladores y métodos están completamente tipados. Las definiciones de tipos están disponibles para:
- Configuraciones y estados de instancia
- Mensajes y contactos de chat
- Estructuras y operaciones de grupos
- Configuraciones de perfil
- Configuraciones de instancia
- Respuestas de API

## Manejo de Errores

El SDK incluye un manejo integral de errores con mensajes detallados de la API.

## Licencia

Este proyecto se distribuye bajo la licencia [MIT](https://opensource.org/licenses/MIT)

## Autor

Esta librería fue adaptada por [Jorge Solano Kirk](https://github.com/jskfox).

## Créditos

Esta librería se basa en el código de [Evolution Manager](https://github.com/EvolutionAPI/evolution-manager), desarrollado por [Gabriel Pastori] bajo la licencia MIT.