#!/bin/bash
# This script runs the app in production mode inside containers.

# Stop running containers and remove their images and volumes:
docker compose down --rmi all -v

# Start Containers:
docker compose up
