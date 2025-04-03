.PHONY: backup-dump


lefthook-install:
	npx lefthook install

install:
	$(MAKE) -C frontend install

run-frontend:
	$(MAKE) -C frontend dev

test:
	$(MAKE) -C frontend test

lint:
	$(MAKE) -C frontend lint

format:
	$(MAKE) -C frontend format

type-check:
	$(MAKE) -C frontend type-check

lint-staged:
	$(MAKE) -C frontend lint-staged

convert:
	$(MAKE) -C frontend convert

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
