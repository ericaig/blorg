## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Prisma
Run migrations using:
```bash
npx prisma migrate dev --name initial_migration
# or
dotenv -e .env.development -- npx prisma migrate dev --name initial_migration
```

After modifying schema.prisma, run the following to apply changes
```bash
npx prisma migrate dev --name added_job_title
```

Run generate using:
```bash
npx prisma generate
# or
dotenv -e .env.development -- npx prisma generate
```

## Tests
```bash
jest -i
# or
dotenv -e .env.test jest -i
```
