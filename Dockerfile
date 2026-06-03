# ─── Base ────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

# ─── Development ─────────────────────────────────────────────────────────────
FROM base AS development
RUN npm install
# Source is mounted at runtime via bind-mount — no COPY needed
CMD ["npm", "run", "dev"]

# ─── Builder ─────────────────────────────────────────────────────────────────
FROM base AS builder
RUN npm ci
COPY . .
RUN npm run build

# ─── Preview (production-like) ───────────────────────────────────────────────
FROM node:22-alpine AS preview
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]
