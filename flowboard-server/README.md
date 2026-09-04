# Vertical City Properties Backend

A backend API built with Express, Prisma ORM, and PostgreSQL.

This project uses PostgreSQL with Prisma ORM for schema management and database migrations. It can run using either a local PostgreSQL instance or a managed Supabase PostgreSQL database.

---

# Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Supabase (optional)
- DigitalOcean Spaces / S3 Compatible Storage

---

# Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher recommended)
- npm or yarn
- PostgreSQL (or a Supabase PostgreSQL project)
- Git

---

# Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Set Up Environment Variables

Create a `.env` file by copying the example file.

```bash
cp .env.example .env
```

Update the values inside `.env`:

```env
# PostgreSQL
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?pgbouncer=true"

DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Server
PORT=4046
BACKEND_BASE_URL=http://localhost:4046

# Bucket Configuration
BUCKET_NAME=your_bucket_name
BUCKET_REGION=your_region
BUCKET_ACCESS_KEY=your_access_key
BUCKET_SECRET_KEY=your_secret_key
BUCKET_ENDPOINT=your_bucket_endpoint

# JWT
JWT_SECRET=your_secret
JWT_COMMAND=your_command
GEN_SALT=10
EXPIRES_IN=45d
NODE_ENV=production

# Email
EMAIL=your_email
APP_PASS=your_app_password
```

### Environment Variable Reference

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL pooled connection used by the application |
| `DIRECT_URL` | Direct PostgreSQL connection used by Prisma migrations |
| `PORT` | Server port |
| `BACKEND_BASE_URL` | Backend base URL |
| `BUCKET_NAME` | Storage bucket name |
| `BUCKET_REGION` | Storage bucket region |
| `BUCKET_ACCESS_KEY` | Storage access key |
| `BUCKET_SECRET_KEY` | Storage secret key |
| `BUCKET_ENDPOINT` | Storage endpoint URL |
| `JWT_SECRET` | Secret used to sign JWT tokens |
| `JWT_COMMAND` | JWT command/key used by the application |
| `GEN_SALT` | Bcrypt salt rounds |
| `EXPIRES_IN` | JWT expiration time |
| `EMAIL` | SMTP email address |
| `APP_PASS` | SMTP app password |
| `NODE_ENV` | HTTP cookie mode |
| `CORS_ORIGINS`  | allowed routes list, comma separated | 

> **Note:** Make sure your PostgreSQL/Supabase database is accessible before running Prisma migrations.

---

## 4. Generate Prisma Client

```bash
npx prisma generate
```

---

## 5. Run Database Migrations

For local development:

```bash
npx prisma migrate dev --name init
```

For production deployments:

```bash
npx prisma migrate deploy
```

---

## 6. Seed the Database

```bash
npx prisma db seed
```

---

## 7. Start the Development Server

```bash
npm run dev
```

The server will start on:

```
http://localhost:4046
```

---

# PostgreSQL / Supabase Setup

## Local PostgreSQL

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/your_database?schema=public"
```

---

## Supabase PostgreSQL

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?pgbouncer=true"

DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Use:

- `DATABASE_URL` for pooled connections
- `DIRECT_URL` for Prisma migrations and schema operations

---

# Deployment

## Production Deployment Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create your production `.env` file with the correct values for:

- PostgreSQL / Supabase
- Bucket Storage
- JWT
- Email
- Backend URL

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Apply Database Migrations

```bash
npx prisma migrate deploy
```

### 5. (Optional) Seed the Database

```bash
npx prisma db seed
```

### 6. Build the Project

```bash
npm run build
```

### 7. Start the Server

```bash
npm run start:prod
```

If using PM2:

```bash
pm2 start dist/server.js --name vertical-city-backend
```

---

# Available Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Compile TypeScript |
| `npm run start:prod` | Run production build |
| `npx prisma studio` | Open Prisma Studio |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma migrate dev` | Create and apply development migrations |
| `npx prisma migrate deploy` | Apply existing migrations in production |
| `npx prisma db seed` | Seed the database |

---

# Project Structure

```
.
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│   ├── lib/
│   │   └── prisma.ts
│   └── index.ts
├── .env.example
├── package.json
└── README.md
```

---

# Viewing Your Data

Launch Prisma Studio:

```bash
npx prisma studio
```

It will open at:

```
http://localhost:5555
```

---

# Troubleshooting

### P1001 / Database Connection Error

- Verify PostgreSQL/Supabase is running.
- Check `DATABASE_URL` and `DIRECT_URL`.
- Ensure your IP is allowed to access the database.

---

### Environment Variable Not Found

Ensure:

- `.env` exists
- Variable names are correct
- The application is loading the `.env` file

---

### Prisma Client Out of Sync

Regenerate Prisma Client:

```bash
npx prisma generate
```

---

# License

This project is licensed under the MIT License.