#!/bin/bash
COMPOSE_FILES=("docker-compose.dev.yml" "docker-compose.prod.backend.yml" "docker-compose.prod.frontend.yml")

for file in ${COMPOSE_FILES}; do
docker compose -f ${file} down
done

echo -e "\e[42mDone!\e[0m"
