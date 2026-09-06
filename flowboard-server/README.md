# Flowboard — Backend API

Backend REST API for Flowboard built with Express, TypeScript, Prisma ORM, and PostgreSQL.

---

## Tech Stack

- **Runtime & Language:** Node.js (v20+ recommended), TypeScript
- **Framework:** Express.js
- **Database & ORM:** PostgreSQL, Prisma ORM
- **Authentication:** JWT, Bcrypt
- **Containerization:** Docker & Docker Compose

---

## Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v18 or v20+)
- [npm](https://www.npmjs.com/) (bundled with Node)
- [Git](https://git-scm.com/)
- [Docker & Docker Desktop](https://www.docker.com/) *(recommended for the easiest setup)*

---

## How to Run Locally

You can run the backend in two ways: **Option A (Docker - Recommended)** or **Option B (Manual Node setup)**.

---

### Option A: Run with Docker Compose (Recommended)

This is the quickest way to start the PostgreSQL database and the Express API together with zero manual database configuration.

1. **Navigate to the root directory of the workspace (`flowboard/`):**
   ```bash
   cd flowboard
   ```

2. **Start the containers:**
   ```bash
   docker compose up
   ```
   *(Add `-d` to run in detached background mode: `docker compose up -d`)*

   **What this does automatically:**
   - Starts a PostgreSQL 16 container.
   - Waits until PostgreSQL passes its healthcheck.
   - Generates Prisma client and executes all migrations (`npx prisma migrate deploy`).
   - Starts the Express API server on `http://localhost:4078`.

3. **Useful Docker Commands:**
   - **View live logs:**
     ```bash
     docker compose logs -f api
     ```
   - **Rebuild containers after dependency/code changes:**
     ```bash
     docker compose up --build
     ```
   - **Stop containers:**
     ```bash
     docker compose down
     ```
   - **Stop and reset database volume:**
     ```bash
     docker compose down -v
     ```

---

### Option B: Run Manually (Local Node + PostgreSQL)

If you have a local PostgreSQL instance running or are using a cloud database (like Supabase/Neon/Render):

1. **Navigate to the backend directory:**
   ```bash
   cd flowboard-server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your `.env` file:**
   ```bash
   cp .env.example .env
   ```
   *(See the [Environment Variables](#environment-variables-env-instructions) section below to fill in your values)*

4. **Generate the Prisma Client:**
   ```bash
   npx prisma generate
   ```

5. **Apply Database Migrations:**
   ```bash
   npx prisma migrate dev
   ```
   *(Or for existing migrations: `npx prisma migrate deploy`)*


7. **Start the development server:**
   ```bash
   npm run dev
   ```

   The server will start at:
   ```
   http://localhost:4078
   ```

---

## Environment Variables (`.env`) Instructions

Create a `.env` file in the `flowboard-server` directory:

```bash
cp .env.example .env
```

### Example `.env` Configuration

```env
# PostgreSQL Connection Strings
# Local PostgreSQL / Docker format:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/flowboard?schema=public"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/flowboard?schema=public"

# For Supabase / Connection Poolers (optional):
# DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?pgbouncer=true"
# DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Server Configuration
PORT=4078
NODE_ENV=development

# JWT & Security Configuration
JWT_SECRET=your_jwt_secret_key_here
GEN_SALT=10
EXPIRES_IN=45d
BCRYPT_SALT_ROUNDS=12

# Email Configuration (Nodemailer / SMTP)
EMAIL="your_email@gmail.com"
APP_PASS="your_gmail_app_password"

# Cloudinary Configuration (Optional - for file/image uploads)
CLOUDNAME="YOUR_CLOUD_NAME"
API_KEY="YOUR_API_KEY"
API_SECRET="YOUR_API_SECRET"

# CORS Configuration (comma-separated origins)
CORS_ORIGINS=http://localhost:3000,http://localhost:3060
```

### Environment Variable Reference

| Variable | Required | Description | Example / Default |
| :--- | :--- | :--- | :--- |
| `DATABASE_URL` | **Yes** | PostgreSQL connection URL for Prisma Client queries | `postgresql://postgres:postgres@localhost:5432/flowboard?schema=public` |
| `DIRECT_URL` | **Yes** | Direct PostgreSQL connection for Prisma schema migrations | `postgresql://postgres:postgres@localhost:5432/flowboard?schema=public` |
| `PORT` | No | Port on which the Express server listens | `4078` |
| `NODE_ENV` | No | Application environment (`development` / `production`) | `development` |
| `JWT_SECRET` | **Yes** | Secret string for signing and verifying JWT tokens | `secret` |
| `GEN_SALT` | No | Salt rounds for hashing | `10` |
| `EXPIRES_IN` | No | JWT token expiry duration | `45d` |
| `BCRYPT_SALT_ROUNDS` | No | Bcrypt hashing rounds | `12` |
| `CORS_ORIGINS` | No | Allowed frontend origins (comma-separated) | `http://localhost:3000,http://localhost:3060` |
| `EMAIL` | No | SMTP email address for sending verification/OTP emails | `user@example.com` |
| `APP_PASS` | No | SMTP application password | `app_password` |
| `CLOUDNAME` | No | Cloudinary cloud name for media storage | `your_cloud_name` |
| `API_KEY` | No | Cloudinary API Key | `your_api_key` |
| `API_SECRET` | No | Cloudinary API Secret | `your_api_secret` |

---

## Available NPM Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start development server with live reload (`ts-node-dev`) |
| `npm run build` | Compile TypeScript to JavaScript in `dist/` |
| `npm run start:prod` | Run the compiled production build from `dist/server.js` |
| `npx prisma studio` | Open Prisma Studio visual database editor (`http://localhost:5555`) |
| `npx prisma generate` | Generate Prisma client from `prisma/schema.prisma` |
| `npx prisma migrate dev` | Create and apply database migrations in development |
| `npx prisma migrate deploy` | Apply pending migrations to the database |
| `npx prisma db seed` | Run database seeding script (`prisma/seed.ts`) |

---

## Exploring the Database (Prisma Studio)

To inspect and manage database records through a web UI:

```bash
npx prisma studio
```
Navigate to:
```
http://localhost:5555
```

---

## Troubleshooting

- **Database Connection Error (`P1001`):**
  - If using Docker, ensure Docker Desktop is running and run `docker compose ps` to verify the `flowboard-postgres` container is healthy.
  - If running manually, check that your local PostgreSQL service is active and credentials in `DATABASE_URL` are correct.
- **Port Conflict (4078 or 5432 already in use):**
  - Stop any existing PostgreSQL services or local processes bound to these ports before launching Docker.
- **Prisma Client Out of Sync:**
  - Run `npx prisma generate` to synchronize the Prisma Client with `prisma/schema.prisma`.