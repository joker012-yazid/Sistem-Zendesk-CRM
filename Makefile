.PHONY: up down logs db-up prisma-in-container prisma-host seed

up:
	docker compose up -d --build

down:
	docker compose down

logs:
	docker compose logs -f

db-up:
	docker compose up -d postgres redis

prisma-in-container:
	./scripts/prisma-in-container.sh

prisma-host:
	./scripts/prisma-host.sh

seed:
	SEED_ON_START=true docker compose up -d --build api
