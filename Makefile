.PHONY: dev db-up prisma-gen prisma-dep seed up

dev:
	cd api && pnpm install && pnpm prisma:generate && cd .. \
	&& cd web && pnpm install && cd ..

db-up:
	docker compose up -d postgres redis

prisma-gen:
	docker compose run --rm api pnpm prisma:generate

prisma-dep:
	docker compose run --rm api pnpm prisma:deploy

seed:
	docker compose run --rm api pnpm prisma:seed

up:
	docker compose up -d --build
