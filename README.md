# Sistem-Zendesk-CRM

Rangka kerja asas untuk Sistem Zendesk CRM berasaskan web. Projek ini mengandungi backend NestJS + Prisma dan frontend React + Vite.

## Container-first setup

```bash
make db-up
make prisma-in-container
make up
```

Web: http://localhost:8080  |  API: http://localhost:8081

Gunakan `.env.docker` apabila menjalankan dalam container (hostname `postgres`). Untuk pembangunan dari host, `.env.local` menyediakan sambungan ke `localhost`. Disarankan menjalankan Prisma dalam container; jika menjalankan dari host, override `DATABASE_URL=postgresql://appuser:apppass@localhost:5432/sistem_crm?schema=public`.

> **Nota**: Prisma hanya menyokong komen `//` atau `///` (bukan `/* ... */`). Fail Prisma mesti disimpan dalam encoding UTF-8 dengan line ending LF untuk mengelakkan ralat P1012.

## Endpoint Ringkas

- `POST /auth/register`
- `POST /auth/login`
- `GET /tickets`
- `POST /tickets`

## Build API (Docker)

API menggunakan Dockerfile multi-stage. Peringkat build memasang dependensi, menjalankan `pnpm prisma:generate` dan membina kod. Peringkat runtime hanya membawa masuk output build, fail Prisma dan binari Prisma daripada peringkat sebelumnya, menjadikan imej lebih kecil.

Semasa build, `prisma generate` mesti dijalankan supaya klien Prisma tersedia. Prisma menggunakan `String` (cuid) sebagai jenis id, bukan integer; oleh itu `customerId` dalam DTO dan servis ditakrifkan sebagai `string`.
