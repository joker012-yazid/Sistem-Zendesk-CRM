# Sistem-Zendesk-CRM

Rangka kerja asas untuk Sistem Zendesk CRM berasaskan web. Projek ini mengandungi backend NestJS + Prisma dan frontend React + Vite.
Projek ini menggunakan `bcryptjs` untuk elak isu native binary dalam Docker.

## Container-first setup

```bash
make db-up
make prisma-in-container   # atau: docker compose run --rm api pnpm prisma migrate dev --name init
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

API menggunakan Dockerfile multi-stage. Peringkat build memasang dependensi, menjalankan `pnpm prisma:generate` dan membina kod.

Dengan pnpm, struktur `node_modules` berasaskan symlink; **jangan** salin `node_modules/.prisma` secara hardcoded. Peringkat runtime memasang semula dependensi (termasuk `devDependencies`), membawa masuk output build dan fail Prisma, kemudian menjana klien Prisma di dalam imej akhir.

Runtime perlu memasang devDependencies supaya `pnpm prisma:deploy` dalam `entrypoint.sh` dapat dijalankan. Jika mahu membuang devDependencies, boleh gunakan `pnpm dlx prisma migrate deploy` atau pindahkan pakej `prisma` ke `dependencies`.

> **Nota**: Prisma memerlukan OpenSSL pada runtime; kita guna base Debian (glibc) dan pasang `openssl` untuk kestabilan. Jika mahu kekal Alpine, perlu set binary targets dan bawa masuk engine untuk musl, namun Debian adalah laluan paling stabil.

Semasa build, `prisma generate` mesti dijalankan supaya klien Prisma tersedia. Prisma menggunakan `String` (cuid) sebagai jenis id, bukan integer; oleh itu `customerId` dalam DTO dan servis ditakrifkan sebagai `string`.
