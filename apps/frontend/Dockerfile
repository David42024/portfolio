# apps/frontend/Dockerfile

FROM node:20-alpine

WORKDIR /app/apps/frontend

# Copiar archivos de dependencias
COPY apps/frontend/package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY apps/frontend ./

# Variable de entorno para build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build
RUN npm run build

# Puerto
EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

# Iniciar
CMD ["npm", "start"]