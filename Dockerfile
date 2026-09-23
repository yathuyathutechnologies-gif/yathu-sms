FROM node:22-alpine AS base


FROM base AS installer-dev

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci --ignore-scripts


FROM base AS installer-prod

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci  --omit=dev --ignore-scripts


FROM base AS builder

WORKDIR /app
COPY --from=installer-dev /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build


FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy production dependencies and built output
COPY --from=installer-prod /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

RUN chown -R node:node /app

USER node

EXPOSE 3000

CMD ["npm", "run", "start"]
