// apps/backend/api/index.ts
// Punto de entrada serverless para Vercel.
// Exporta la app de Express directamente (Vercel la ejecuta como función serverless).
// El `app.listen()` de src/index.ts queda reservado para desarrollo local (`npm run dev`).
import app from "../src/app";

export default app;
