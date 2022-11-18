#!/bin/bash
sleep 1

. ./install.sh

docker-compose up -d --build
docker exec -it app npx prisma migrate deploy
