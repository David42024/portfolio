import { Router } from "express";
import { prisma } from "../config/db";

const router = Router();

router.get("/", async (_req, res) => {
  const start = Date.now();

  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      responseTime: `${Date.now() - start}ms`,
      database: "connected",
    });
  } catch (error) {
    res.status(503).json({
      status: "error",
      timestamp: new Date().toISOString(),
      responseTime: `${Date.now() - start}ms`,
      database: "disconnected",
    });
  }
});


export default router;