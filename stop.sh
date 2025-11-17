#!/bin/bash
set -euo pipefail

echo "Stopping Docker containers..."
docker compose down

echo "Stopping ngrok processes..."
# Kill any ngrok processes running
pkill -f ngrok || true

echo "Stopping node processes..."
# Kill node processes (if any) running in your project
pkill -f "node" || true

echo "Stopping any leftover nginx processes..."
sudo pkill -f nginx || true

echo "Cleanup complete!"
