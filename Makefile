.PHONY: dev up

dev:
cd api && pnpm install && pnpm prisma:generate && cd .. \
&& cd web && pnpm install && cd ..

up:
docker compose up -d
