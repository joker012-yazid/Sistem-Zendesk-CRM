# Sistem-Zendesk-CRM

Rangka kerja asas untuk Sistem Zendesk CRM berasaskan web. Projek ini mengandungi backend NestJS + Prisma dan frontend React + Vite.

## Pemasangan

Langkah ringkas (Debian):

```bash
cd api && cp .env.example .env && pnpm install && pnpm run format:lf && pnpm prisma:generate && pnpm prisma:migrate && pnpm prisma:seed
cd ../web && pnpm install
docker compose up -d --build
```

Web: http://localhost:8080  |  API: http://localhost:8081

> **Nota**: Prisma hanya menyokong komen `//` atau `///` (bukan `/* ... */`). Fail Prisma mesti disimpan dalam encoding UTF-8 dengan line ending LF untuk mengelakkan ralat P1012.

## Endpoint Ringkas

- `POST /auth/register`
- `POST /auth/login`
- `GET /tickets`
- `POST /tickets`
