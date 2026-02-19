# =============================================================================
# Stage 1 — WordPress (CMS backend)
# =============================================================================
# Run this via docker-compose (see below). The WordPress container serves
# the GraphQL API consumed by the Next.js frontend.
#
# docker-compose.yml example:
#
#   version: '3.8'
#   services:
#     db:
#       image: mysql:8.0
#       environment:
#         MYSQL_ROOT_PASSWORD: root
#         MYSQL_DATABASE: wordpress
#     wordpress:
#       image: wordpress:6.5
#       ports: ["8080:80"]
#       environment:
#         WORDPRESS_DB_HOST: db
#         WORDPRESS_DB_NAME: wordpress
#         WORDPRESS_DB_USER: root
#         WORDPRESS_DB_PASSWORD: root
#       depends_on: [db]
#     nextjs:
#       build:
#         context: .
#         dockerfile: Dockerfile
#       ports: ["3000:3000"]
#       environment:
#         NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT: http://wordpress/graphql
#       depends_on: [wordpress]
# =============================================================================

# =============================================================================
# Stage 2 — Next.js frontend (multi-stage build)
# =============================================================================

FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build the Next.js app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT
ENV NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT=$NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT

RUN npm run build

# Production image — minimal footprint
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
