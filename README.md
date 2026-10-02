# split-horizon Chat Frontend

Modern cartoon-style chat frontend built with Next.js and React. Integrates with backendKURILSHKA Go API and BAZA PostgreSQL/Redis services.

## Stack

- Node.js
- Next.js 14
- React 18
- CSS

## Run locally

```bash
npm install
npm run dev
```

## Docker

```bash
docker network create app-network || true
cp .env.example .env
npm install
docker compose up --build
```

Frontend: http://localhost:3000
Backend API: http://localhost:8080
