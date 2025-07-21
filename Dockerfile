
# --- Dockerfile multi-stage pour dev et prod ---
FROM node:20-alpine AS base

# Ajouter un utilisateur non-root pour éviter les problèmes de permissions
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

# Copie des fichiers package
COPY package.json package-lock.json* ./

# --- Dépendances pour dev ---
FROM base AS dev
RUN npm ci

# Changer le propriétaire du dossier vers l'utilisateur nextjs
RUN chown -R nextjs:nodejs /app
USER nextjs

COPY --chown=nextjs:nodejs . .
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "run", "dev"]

# --- Dépendances pour build/prod ---
FROM base AS deps
COPY prisma ./prisma
RUN npm ci && npm cache clean --force

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Créer le dossier .next avec les bonnes permissions
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=deps /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
