# Examples / Ejemplos

This directory contains practical examples for using the Evolution2 API SDK.

Este directorio contiene ejemplos prácticos para usar el SDK de Evolution2 API.

## Running Examples / Ejecutar Ejemplos

1. Copy `.env.example` to `.env` and configure:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your credentials:

   ```
   EVOLUTION_HOST=https://your-evolution-api.com
   EVOLUTION_API_KEY=your-api-key
   EVOLUTION_INSTANCE=your-instance-name
   TEST_NUMBER=5511999999999
   ```

3. Run an example:

   ```bash
   npx ts-node examples/basic-usage.ts
   ```

## Available Examples / Ejemplos Disponibles

| File | Description |
|------|-------------|
| `basic-usage.ts` | Basic text messages, images, and reactions |
| `media-files.ts` | Sending local files as base64 |

## Requirements / Requisitos

- Node.js 18+
- TypeScript
- ts-node (`npm install -g ts-node`)
