#!/bin/bash
# This script runs the app in production mode inside containers.

# Stop running containers and remove their images and volumes:
docker compose down --rmi all -v

# Setup environment variables:
cp .env.production backend/.env
cp .env.production frontend/.env

# Start Containers:
docker compose up
