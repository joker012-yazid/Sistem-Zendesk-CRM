# Sistem-Zendesk-CRM

Rangka kerja asas untuk Sistem Zendesk CRM berasaskan web. Projek ini mengandungi backend NestJS + Prisma dan frontend React + Vite.

## Pemasangan

Terdapat dua pilihan:

- Dalam container:
  ```bash
  docker compose up -d postgres redis
  docker compose run --rm api pnpm prisma:generate
  docker compose run --rm api pnpm prisma:deploy
  docker compose run --rm api pnpm prisma:seed
  docker compose up -d --build
  ```

- Dari host (dev cepat):
  ```bash
  cd api && cp .env.local .env
  pnpm prisma:generate
  pnpm prisma:migrate
  pnpm prisma:seed
  ```

Web: http://localhost:8080  |  API: http://localhost:8081

> **Nota**: Prisma hanya menyokong komen `//` atau `///` (bukan `/* ... */`). Fail Prisma mesti disimpan dalam encoding UTF-8 dengan line ending LF untuk mengelakkan ralat P1012.

## Endpoint Ringkas

- `POST /auth/register`
- `POST /auth/login`
- `GET /tickets`
- `POST /tickets`

## Build API (Docker)

API menggunakan Dockerfile multi-stage. Peringkat build memasang dependensi, menjalankan `pnpm prisma:generate` dan membina kod. Peringkat runtime hanya membawa masuk output build, fail Prisma dan binari Prisma daripada peringkat sebelumnya, menjadikan imej lebih kecil.

Semasa build, `prisma generate` mesti dijalankan supaya klien Prisma tersedia. Prisma menggunakan `String` (cuid) sebagai jenis id, bukan integer; oleh itu `customerId` dalam DTO dan servis ditakrifkan sebagai `string`.
