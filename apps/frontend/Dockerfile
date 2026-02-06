FROM node:20-alpine

WORKDIR /app/apps/frontend

COPY apps/frontend/package*.json ./
RUN npm install
COPY apps/frontend ./

# ← ARG y ENV ANTES del build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN echo "Building with API_URL: $NEXT_PUBLIC_API_URL"   # ← Debug
RUN npm run build

EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000

CMD ["npm", "start"]