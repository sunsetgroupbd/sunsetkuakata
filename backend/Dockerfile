# ==============================================================================
# Sunset Kuakata Hotel & Resort - Production Backend Dockerfile
# Multi-stage build for NestJS 10 + Prisma ORM
# ==============================================================================

# --- Stage 1: Build Stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# Install OpenSSL for Prisma engine compatibility on Alpine
RUN apk add --no-cache openssl libc6-compat

# Copy package manifests
COPY package*.json ./
COPY tsconfig*.json ./

# Install all dependencies (including devDependencies needed for build)
RUN npm install

# Copy Prisma schema and generate Prisma client
COPY prisma ./prisma
RUN npx prisma generate

# Copy source code and build production bundle
COPY src ./src
RUN npm run build

# --- Stage 2: Production Runner ---
FROM node:20-alpine AS runner

WORKDIR /app

# Install OpenSSL for Prisma engine
RUN apk add --no-cache openssl libc6-compat

ENV NODE_ENV=production
ENV PORT=4000

# Copy manifests and install production-only dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy generated Prisma client from builder
COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

# Copy built application
COPY --from=builder /app/dist ./dist

# Create directory for persistent SQLite database
RUN mkdir -p /app/prisma

# Expose default API port
EXPOSE 4000

# Push Prisma schema to DB (SQLite file or PostgreSQL) and launch NestJS API
CMD ["sh", "-c", "npx prisma db push && node dist/main.js"]
