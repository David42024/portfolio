FROM node:20-alpine

WORKDIR /app/apps/backend

COPY apps/backend/package*.json ./
RUN npm ci

COPY apps/backend/prisma ./prisma
RUN npx prisma generate

# 👇 Copia TODO, no solo src
COPY apps/backend ./

RUN npm run build

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

CMD ["node", "dist/src/index.js"]
