# ---- build stage ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN npm i -g pnpm && pnpm install
COPY . .
RUN pnpm prisma:generate && pnpm build

# ---- runtime ----
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
RUN npm i -g pnpm
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
RUN pnpm prisma:generate
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 8081
ENTRYPOINT ["/entrypoint.sh"]
