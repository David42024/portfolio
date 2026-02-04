# apps/backend/Dockerfile

FROM node:20-alpine

WORKDIR /app/apps/backend

# Copiar archivos de configuración
COPY apps/backend/package*.json ./
COPY apps/backend/prisma.config.ts ./
COPY apps/backend/prisma ./prisma/

# Instalar dependencias
RUN npm install --include=dev

# Generar Prisma Client (v7 - genera en node_modules/.prisma/client)
RUN npx prisma generate

# Copiar código fuente
COPY apps/backend/src ./src
COPY apps/backend/tsconfig.json ./

# Compilar TypeScript
RUN npm run build

# Remover dependencias dev
RUN npm prune --production

# Puerto
EXPOSE 4000

ENV NODE_ENV=production
ENV PORT=4000

# Iniciar
CMD ["node", "dist/index.js"]