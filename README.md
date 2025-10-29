# MadeInPortugal Store

A Node.js + PostgreSQL + Docker project for a marketplace of traditional Portuguese products.

This guide explains how to set up the project **locally** for development.

---

## **Prerequisites**

Make sure you have the following installed on your machine:

* [Node.js](https://nodejs.org/) (v22+ recommended)
* [npm](https://www.npmjs.com/)
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

---

## **Folder Structure**

```
madeinportugal-store/
├── app/
│   ├── index.js
│   ├── db.js
│   ├── routes/
│   │   └── products.js
│   ├── controllers/
│   │   └── productController.js
│   ├── db/
│   │   ├── mip-s_schema.sql
│   │   └── populate.sql
│   ├── public/
│   │   ├── index.html
│   │   ├── css/
│   │   │   └── style.css
│   │   └── js/
│   ├── .env
│   └── package.json
├── nginx/
│   └── default.conf
└── docker-compose.yml
```

* `app/` → Node.js backend
* `app/public/` → Frontend files (HTML/CSS/JS)
* `app/routes/` → Express API routes
* `app/.env` → environment variables
* `app/package.json` → Node.js dependencies and scripts
* `nginx/` → Nginx configuration
* `docker-compose.yml` → Docker services configuration

---

## **1. Clone the Repository**

```bash
git clone git@github.com:FEUP-MEIC-DS-2025-26/madeinportugal.store.git
cd madeinportugal-store
```

---

## **2. Install Node.js Dependencies**

```bash
npm install
```

---

## **3. Start PostgreSQL via Docker**

```bash
docker run --name postgres_local \
  -e POSTGRES_PASSWORD=1234 \
  -e POSTGRES_DB=madeinportugal \
  -p 5433:5432 \
  -d postgres:18
```

* This starts a local PostgreSQL container on port `5433`.


---

## **4. Create and Populate the Database**

1. **Run the schema SQL file:**

```bash
docker exec -i postgres_local psql -U postgres -d madeinportugal < db/mip-s_schema.sql
```

2. **Run the populate SQL file:**

```bash
docker exec -i postgres_local psql -U postgres -d madeinportugal < db/populate.sql
```

3. **Verify tables and data:**

```bash
docker exec -it postgres_local psql -U postgres -d madeinportugal
```

---

## **5. Start the Backend Locally**

```bash
npm run dev
```

* Starts the backend with `nodemon` on `http://localhost:3000`.
* Auto-restarts on code changes.

---

## **6. Access the App**

* Frontend: `http://localhost:3000/`

---

## **7. Next Steps**

* Implement frontend pages in `app/public`.
* Add new API routes in `app/routes`.
* Use Docker Compose to run locally with the same environment as the server.

---

**Good luck coding!**
