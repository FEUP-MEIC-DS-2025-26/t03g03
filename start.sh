# Start Containers:
docker compose up

# Create and populate database:
docker exec -it postgres_db psql -U postgres -d madeinportugal -f /docker-entrypoint-initdb.d/mip-s_schema.sql
docker exec -it postgres_db psql -U postgres -d madeinportugal -f /docker-entrypoint-initdb.d/populate.sql
