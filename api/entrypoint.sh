#!/usr/bin/env sh
set -e

# Deploy migration (idempotent)
pnpm prisma:deploy

# Seed opsyenal (toggle melalui env)
if [ "${SEED_ON_START:-false}" = "true" ]; then
  pnpm prisma:seed || true
fi

node dist/main.js
