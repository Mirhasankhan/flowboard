FROM node:20-alpine

# Install OpenSSL and libc compatibility for Prisma
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# Copy dependency specifications and Prisma schema
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies and generate Prisma client
RUN npm install

# Copy application source code and configuration
COPY . .

# Expose server port (default 4078)
EXPOSE 4078

# Run migrations and start the development server
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
