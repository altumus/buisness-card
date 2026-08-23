# Digital business card

Monorepo: NestJS + GraphQL + Prisma (backend) and React + Vite (frontend).
Card data lives in PostgreSQL and is served by the `profile` query.

## Run

1. Start the database:

```bash
docker compose up -d
```

2. Migrate and seed:

```bash
cd backend
copy .env.example .env
npx prisma migrate dev --name init
npx prisma db seed
npm run start:dev
```

3. Frontend:

```bash
cd frontend
npm run dev
```

Card: http://localhost:5173/
GraphQL: http://localhost:3001/graphql

Postgres listens on `localhost:5433`, backend on `3001` (5432 and 3000 may already be in use by other local services).
