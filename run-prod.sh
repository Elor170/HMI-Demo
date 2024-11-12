#!/bin/bash

docker compose -f docker-compose.prod.backend.yml up -d
docker compose -f docker-compose.prod.frontend.yml up -d
GREEN='\003[1;32'
NC='\033[0m'
printf "${GREEN}Started all prod services!${NC}\n"