# apps/backend/Dockerfile

FROM node:20-alpine

WORKDIR /app

# Copiar package.json de la raíz y del backend
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/
COPY apps/backend/prisma ./apps/backend/prisma/

# Instalar dependencias del backend
WORKDIR /app/apps/backend
RUN npm install

# Generar Prisma Client
RUN npx prisma generate --schema=./prisma/schema.prisma

# Copiar código fuente del backend
WORKDIR /app
COPY apps/backend ./apps/backend

# Compilar TypeScript
WORKDIR  /apps/backend
RUN npm run build

# Puerto
EXPOSE 4000

ENV NODE_ENV=production
ENV PORT=4000

# Iniciar
CMD ["node", "dist/index.js"]