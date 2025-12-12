# Evolution2 API SDK

A modern TypeScript SDK for Evolution API v2, making WhatsApp integration straightforward for Node.js and Next.js applications.

[![npm version](https://badge.fury.io/js/evolution2-api-sdk.svg)](https://www.npmjs.com/package/evolution2-api-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why This SDK?

- **Set it once, use everywhere** - Configure your instance name once in the constructor, no need to repeat it in every method call
- **Fully typed** - Complete TypeScript support with IntelliSense for all methods and options
- **Modern async/await** - Clean, promise-based API that feels natural to use
- **Flexible** - Override the default instance anytime, perfect for multi-instance scenarios
- **Complete** - 60+ methods covering all Evolution API v2.3 endpoints

## Installation

```bash
npm install evolution2-api-sdk
```

## Quick Start

```typescript
import { Evolution2SDK } from 'evolution2-api-sdk';

const client = new Evolution2SDK({
  host: 'https://your-evolution-api.com',
  apiKey: 'your-api-key',
  instanceName: 'my-whatsapp' // optional default instance
});

// Send a message - no need to specify instance again
await client.message.sendText({
  number: '5511999999999',
  text: 'Hello from Evolution SDK!'
});

// Need to use a different instance? Just pass it as the last parameter
await client.message.sendText(
  { number: '5511888888888', text: 'Hi!' },
  'another-instance'
);
```

## Core Features

### Message Types
Send any type of WhatsApp message with simple, intuitive methods:

```typescript
// Text with link preview
await client.message.sendText({
  number: '5511999999999',
  text: 'Check this out: https://example.com',
  linkPreview: true
});

// Media (images, videos, documents)
await client.message.sendMedia({
  number: '5511999999999',
  mediatype: 'image',
  media: 'https://example.com/photo.jpg',
  caption: 'Beautiful sunset'
});

// Interactive lists
await client.message.sendList({
  number: '5511999999999',
  title: 'Our Menu',
  description: 'Choose your favorite',
  buttonText: 'View Menu',
  sections: [{
    title: 'Main Dishes',
    rows: [
      { title: 'Pizza', description: 'Margherita', rowId: '1' },
      { title: 'Burger', description: 'Classic beef', rowId: '2' }
    ]
  }]
});

// Polls, buttons, reactions, stickers, and more...
```

### Instance Management

```typescript
// Create a new instance
const instance = await client.instance.create({
  instanceName: 'sales-bot',
  integration: 'WHATSAPP-BAILEYS',
  qrcode: true
});

// Get QR code for connection
const connection = await client.instance.connect();
console.log(connection.base64); // Display this QR code

// Check connection status
const state = await client.instance.connectionState();
console.log(state.state); // 'open', 'close', or 'connecting'
```

### Chat Operations

```typescript
// Get all chats
const chats = await client.chat.findChats();

// Mark messages as read
await client.chat.markAsRead({
  readMessages: [{
    remoteJid: '5511999999999@s.whatsapp.net',
    fromMe: false,
    id: 'MESSAGE_ID'
  }]
});

// Send typing indicator
await client.chat.sendPresence({
  number: '5511999999999',
  presence: 'composing',
  delay: 2000
});
```

### Group Management

```typescript
// Create a group
const group = await client.group.create({
  subject: 'Project Team',
  description: 'Our awesome project',
  participants: ['5511999999999', '5511888888888']
});

// Add participants
await client.group.updateParticipant(group.id, {
  action: 'add',
  participants: ['5511777777777']
});

// Get invite link
const invite = await client.group.fetchInviteCode(group.id);
```

## Available Controllers

| Controller | Methods | Purpose |
|------------|---------|---------|
| `instance` | 8 | Create, connect, manage WhatsApp instances |
| `message` | 12 | Send all types of messages (text, media, polls, etc) |
| `chat` | 14 | Chat operations, contacts, message management |
| `group` | 14 | Complete group management |
| `profile` | 8 | Profile and privacy settings |
| `settings` | 11 | Instance configuration |
| `label` | 2 | Label management |
| `websocket` | 2 | Websocket event configuration |

**Total: 71 methods** - See [full documentation](./DOCUMENTATION.md) for details on every method.

## Error Handling

The SDK throws descriptive errors that you can catch and handle:

```typescript
try {
  await client.message.sendText({
    number: 'invalid',
    text: 'Hello'
  });
} catch (error) {
  console.error('Failed to send message:', error.message);
  // Handle the error appropriately
}
```

## Websocket Events

Configure which events you want to receive via websocket:

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

## Dynamic Configuration

Change settings on the fly without recreating the client:

```typescript
// Switch to a different instance
client.setInstance('another-instance');

// Update API credentials
client.setApiKey('new-api-key');
client.setBaseURL('https://new-server.com');
```

## TypeScript Support

All methods and options are fully typed. Import types as needed:

```typescript
import { 
  TextMessageOptions,
  MediaMessageOptions,
  Evolution2SDK 
} from 'evolution2-api-sdk';
```

See [DOCUMENTATION.md](./DOCUMENTATION.md) for complete type definitions.

## Requirements

- Node.js 14 or higher
- Evolution API v2.3+
- TypeScript 4.5+ (for TypeScript projects)

## Documentation

- [Complete API Documentation](./DOCUMENTATION.md) - Detailed guide for every method
- [Evolution API Docs](https://doc.evolution-api.com) - Official Evolution API documentation

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Credits

Created and maintained by [Jorge Solano Kirk](https://github.com/jskfox).

Based on [Evolution Manager](https://github.com/EvolutionAPI/evolution-manager) by Gabriel Pastori.

## Support

- **Issues**: [GitHub Issues](https://github.com/jskfox/evolution2-api-sdk/issues)
- **NPM**: [evolution2-api-sdk](https://www.npmjs.com/package/evolution2-api-sdk)