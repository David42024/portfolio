# apps/backend/Dockerfile

FROM node:20-alpine

WORKDIR /app/apps/backend

# Copiar archivos de dependencias
COPY apps/backend/package*.json ./
COPY apps/backend/prisma ./prisma/

# Instalar dependencias
RUN npm install --include=dev

# Generar Prisma Client
RUN npx prisma generate --schema=./prisma/schema.prisma

# Copiar código fuente
COPY apps/backend/src ./src
COPY apps/backend/tsconfig.json ./

# Compilar TypeScript
RUN npm run build

RUN npm prune --production

# Puerto
EXPOSE 4000

ENV NODE_ENV=production
ENV PORT=4000

# Iniciar
CMD ["node", "dist/index.js"]