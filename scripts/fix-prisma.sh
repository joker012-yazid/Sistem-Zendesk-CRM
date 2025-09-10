#!/usr/bin/env bash
set -e
dos2unix api/prisma/schema.prisma 2>/dev/null || true
sed -i 's/\r$//' api/prisma/schema.prisma
pnpm --dir api run format:lf
pnpm --dir api prisma:generate
