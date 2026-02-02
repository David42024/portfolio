# apps/backend/Dockerfile

FROM node:20-alpine

WORKDIR /app

# Copiar package.json
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm ci

# Generar Prisma Client
RUN npx prisma generate

# Copiar código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# Puerto
EXPOSE 4000

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=4000

# Iniciar
CMD ["node", "dist/index.js"]
