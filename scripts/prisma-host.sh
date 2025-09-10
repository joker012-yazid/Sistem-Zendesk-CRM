#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."
docker compose up -d postgres redis
pushd api >/dev/null
cp -n .env.local .env
pnpm prisma:generate
DATABASE_URL="postgresql://appuser:apppass@localhost:5432/sistem_crm?schema=public" pnpm prisma:migrate
DATABASE_URL="postgresql://appuser:apppass@localhost:5432/sistem_crm?schema=public" pnpm prisma:seed
popd >/dev/null
