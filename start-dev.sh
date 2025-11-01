#!/bin/bash

set -euo pipefail

# Install Dependencies
cd backend
npm install

cd ../frontend
npm install

# Setup environment variables
cd ..
cp .env.dev backend/.env
cp .env.dev frontend/.env

# Clean old DB container if it exists
if docker ps -a --format '{{.Names}}' | grep -q '^postgres_local$'; then
  docker rm -f postgres_local >/dev/null 2>&1 || true
fi

# Start Database
docker run --name postgres_local \
  -e POSTGRES_PASSWORD=1234 \
  -e POSTGRES_DB=madeinportugal \
  -p 5432:5432 \
  -d postgres:18

# Wait until DB is ready
echo "Waiting for Postgres to be ready..."
until docker exec postgres_local pg_isready -U postgres -d madeinportugal -q; do
  sleep 1
done

# Populate Database
docker exec -i postgres_local psql -U postgres -d madeinportugal < db/mip-s_schema.sql
docker exec -i postgres_local psql -U postgres -d madeinportugal < db/populate.sql

# Start Backend
cd backend
npm run dev &

# Start Frontend
sleep 1
cd ../frontend
npm run dev
