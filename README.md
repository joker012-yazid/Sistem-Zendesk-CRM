# Sistem-Zendesk-CRM

Rangka kerja asas untuk Sistem Zendesk CRM berasaskan web. Projek ini mengandungi backend NestJS + Prisma dan frontend React + Vite.

## Pemasangan

### Debian (pembangunan tempatan)

1. Pasang Node.js 20 dan pnpm

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   corepack enable
   corepack prepare pnpm@latest --activate
   ```

2. Salin fail contoh dan pasang kebergantungan

   ```bash
   cd api
   cp .env.example .env
   pnpm install
   pnpm run format:lf
   pnpm prisma:generate
   pnpm prisma:migrate
   pnpm prisma:seed
   cd ..
   ```

3. Untuk frontend

   ```bash
   cd web && pnpm install && cd ..
   ```

4. Mulakan API secara pembangunan

   ```bash
   cd api && pnpm dev
   ```

### Docker

1. Pastikan `api/.env` wujud (`cp api/.env.example api/.env`).
2. Jalankan semua servis:

   ```bash
   docker compose up -d
   ```

API tersedia pada `http://localhost:8081` dan web pada `http://localhost:8080` (melalui Nginx).

> **Nota**: Fail Prisma mesti disimpan dalam encoding UTF-8 dengan line ending LF untuk mengelakkan ralat P1012.

## Endpoint Ringkas

- `POST /auth/register`
- `POST /auth/login`
- `GET /tickets`
- `POST /tickets`
