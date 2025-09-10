#!/usr/bin/env sh
set -e

# Opsyen: tunggu Postgres (komplementari kepada depends_on)
# nc -z postgres 5432 || true

# Deploy migration (idempotent)
pnpm prisma:deploy

# Seed jika perlu
if [ "${SEED_ON_START:-false}" = "true" ]; then
  pnpm prisma:seed || true
fi

# Jalankan API
node dist/main.js
