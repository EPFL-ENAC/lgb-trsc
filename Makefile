.PHONY: backup-dump

install:
	$(MAKE) -C frontend install

run-frontend:
	$(MAKE) -C frontend dev

test:
	$(MAKE) -C frontend test

lint:
	$(MAKE) -C frontend lint

lint-staged:
	$(MAKE) -C frontend lint-staged

run-db:
	docker compose up -d --pull=always postgres

stop-db:
	docker compose stop postgres

down-db:
	docker compose down postgres

# setup and run when deploying on server
setup:
	docker network create web
	echo "network created"

run:
	docker compose -f docker-compose.yml pull
	docker compose -f docker-compose.yml build --parallel --no-cache
	docker compose -f docker-compose.yml up -d --remove-orphans

stop:
	docker compose -f docker-compose.yml stop

logs:
	docker compose logs -f $(service)
