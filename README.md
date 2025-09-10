# Sistem-Zendesk-CRM

Rangka kerja asas untuk Sistem Zendesk CRM berasaskan web. Projek ini mengandungi backend NestJS + Prisma dan frontend React + Vite.

## Pemasangan

Prasyarat: Node.js 20, pnpm, Docker.

```bash
# Backend
cd api && cp .env.example .env && pnpm install && pnpm prisma:generate && pnpm prisma:migrate && pnpm prisma:seed && cd ..
# Frontend
cd web && pnpm install && cd ..
# Docker
docker compose up -d
```

API tersedia pada `http://localhost:8081` dan web pada `http://localhost:8080` (melalui Nginx).

## Endpoint Ringkas

- `POST /auth/register`
- `POST /auth/login`
- `GET /tickets`
- `POST /tickets`
