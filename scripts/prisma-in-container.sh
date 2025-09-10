#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."
docker compose up -d postgres redis
docker compose run --rm api sh -lc "pnpm prisma:generate && pnpm prisma:deploy && pnpm prisma:seed"
