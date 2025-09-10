# Sistem-Zendesk-CRM

Rangka kerja asas untuk Sistem Zendesk CRM berasaskan web. Projek ini mengandungi backend NestJS + Prisma dan frontend React + Vite.

## Pemasangan

Prasyarat: Node.js 20, pnpm, Docker.

1. Pasang kebergantungan dan jana klien Prisma:
   ```bash
   cd api && pnpm install && pnpm prisma:generate && cd ..
   cd web && pnpm install && cd ..
   ```

2. Jalankan migrasi dan seed:
   ```bash
   cd api && pnpm prisma:migrate && node ../prisma/seed.ts && cd ..
   ```

3. Jalankan perkhidmatan melalui Docker Compose:
   ```bash
   docker compose up -d
   ```

API tersedia pada `http://localhost:8081` dan web pada `http://localhost:8080` (melalui Nginx).

## Endpoint Ringkas

- `POST /auth/register`
- `POST /auth/login`
- `GET /tickets`
- `POST /tickets`
