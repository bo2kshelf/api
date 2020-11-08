COMPOSE_PATH_SEPARATOR := :

COMPOSE_FILE_LOCAL := docker/docker-compose.local.yml

ENV_LOCAL_FILE := .env
ENV_LOCAL = $(shell cat $(ENV_LOCAL_FILE)) ;\
						export COMPOSE_PROJECT_NAME=local ;\
						export COMPOSE_FILE=${COMPOSE_FILE_LOCAL};

.PHONY: dc-local-up
dc-local-up:
	$(ENV_LOCAL)\
		docker-compose up -d -V

.PHONY: dc-local-stop
dc-local-stop:
	$(ENV_LOCAL)\
		docker-compose stop

.PHONY: dc-local-down
dc-local-down:
	$(ENV_LOCAL)\
		docker-compose down

.PHONY: dc-local-restart
dc-local-restart:
	@make dc-local-down
	@make dc-local-up
