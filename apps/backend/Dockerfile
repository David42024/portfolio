FROM node:20-alpine

WORKDIR /app

# 1️⃣ Dependencias (mejor cache)
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/

RUN npm install

# 2️⃣ Código completo
COPY . .

# 3️⃣ Prisma client
RUN npx prisma generate --schema=apps/backend/prisma/schema.prisma

# 4️⃣ Build TS
RUN npm run build

ENV NODE_ENV=production

EXPOSE 4000

# 5️⃣ Entry point correcto
CMD ["node", "apps/backend/dist/src/index.js"]
