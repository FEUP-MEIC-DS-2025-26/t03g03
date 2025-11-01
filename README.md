# MadeInPortugal Store

A marketplace dedicated to the sustainable fair-trade of local and regional traditional products originating from Portugal. These products face a significant risk of disappearing from our homes, shops, production, economy, and the planet.

This is the repository of Group 3.3, where two main services are being developed: A Leaderboard and a Loyalty System.

## Authors

- Diogo Pinto (<up202205225@up.pt>)
- Duarte Assunção (<up202208319@up.pt>)
- Francisco Araújo (<up201806326@up.pt>)
- Francisco Fernandes (<up202104843@up.pt>)
- Francisco Mendonça (<up202006728@up.pt>)
- Hugo Barbosa (<up202205774@up.pt>)

---

## Description

The customer can review a product, giving it a rating (0 to 5). In a review, the customer can optionally comment their experience with the product so that other potential buyers can make a more informed decision.

Each product category has a leaderboard where the products will be ranked. Only the products with a relevant number of orders can be placed in the leaderboard. This ranking is based on the product rating. This allows the buyers to easily know the best products.

At the end of the year, products will be awarded based on their performance in the leaderboard. There will be an award for the best ranked product, for the most sold product and for the revelation of the year (the product that grew the most in rank).

With each purchase, customers earn points based on the amount spent. These points are stored in their profile and can later be redeemed to purchase other products. When placing a new order, customers can convert their accumulated points into a monetary discount, allowing them to pay partially or entirely with points. This gamified reward system encourages repeat purchases and increases customer engagement.

## Key Features

- Review products with rating and comments.
- A Leaderboard for each product category.
- Awards for the products on the top of the leaderboards.
- Gain points when buying products.
- Buy products with points.

## Technologies

- Node.js + Express.js for Backend
- PostgresSQL for Database
- React + Vite for Frontend
- Docker
- Google Cloud
- Terraform

---

## Folder Structure

```text
t03g03
├── backend
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   │   ├── controllers
│   │   │   └── productController.js
│   │   ├── db.js
│   │   ├── index.js
│   │   └── routes
│   │       └── products.js
│   └── start.sh
├── db
│   ├── mip-s_schema.sql
│   └── populate.sql
├── docker-compose.yml
├── frontend
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── src
│   │   ├── api.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── components
│   │   │   └── ProductList.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── start.sh
│   └── vite.config.js
├── README.md
└── start.sh
```

Backend:

- `backend/` → Node.js + Express.js backend
- `backend/src/routes/` → Express API routes
- `backend/.env` → environment variables
- `backend/package.json` → Node.js dependencies and scripts

Frontend:

- `frontend/` → React backend
- `frontend/public/` → Production frontend files
- `frontend/src/` → Frontend source code
- `frontend/package.json` → React and Vite dependencies and scripts
- `frontend/index.html` → Frontend development phase HTML file
- `frontend/vite.config.js` → Vite configuration file
- `frontend/Dockerfile` → Frontend docker image dockerfile
- `frontend/start.sh` → Frontend docker image shell file

Root:

- `docker-compose.yml` → Docker services configuration
- `start.sh` → Shell file that builds the production environment and Docker containers

---

## How to run

The app can be run either in development mode (all the changes will take effect immediately) or in production mode with each service in its container.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v22+ recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Clone the Repository

```bash
git clone git@github.com:FEUP-MEIC-DS-2025-26/t03g03.git
cd t03g03
```

### Run in Production mode

```bash
./start.sh
```

This sets the docker containers up and runs the app. This does **not** auto-restart on code changes - must build again to see changes.

### Run in Development mode

#### 1. Install Node.js and React Dependencies

From root, go to backend folder and install:

```bash
cd backend
npm install
```

From root, go to frontend folder and install:

```bash
cd frontend
npm install
```

#### 2. Start PostgreSQL Database

Start a PostgreSQL container on port `5432`:

```bash
docker run --name postgres_local \
  -e POSTGRES_PASSWORD=1234 \
  -e POSTGRES_DB=madeinportugal \
  -p 5432:5432 \
  -d postgres:18
```

Create the Database:

```bash
docker exec -i postgres_local psql -U postgres -d madeinportugal < db/mip-s_schema.sql
```

Populate the Database:

```bash
docker exec -i postgres_local psql -U postgres -d madeinportugal < db/populate.sql
```

**If needed** Verify tables and data:

```bash
docker exec -it postgres_local psql -U postgres -d madeinportugal
```

#### 3. Start the Backend Locally

From root folder:

```bash
cd backend
npm run dev
```

- Starts the backend with `nodemon` on `http://localhost:3000`.

#### 4. Start the Frontend Locally

From root folder:

```bash
cd frontend
npm run dev
```

- Starts the frontend on <http://localhost:5173>.

## Access the App

The app can be accessed at <http://localhost:5173>.

---

## Next Steps

- Implement more frontend pages in `frontend/src`.
- Add new API routes in `backend/src/routes`.

**Good luck coding!**
