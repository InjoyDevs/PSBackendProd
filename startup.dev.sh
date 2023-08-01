#!/usr/bin/env bash

export $(grep -v '^#' .env | xargs)

git pull origin main
npm run build
npm run migration:run

if [ "$NODE_ENV"== "production" ]
then
  pm2 start nest
else
  npm run start:prod
fi
