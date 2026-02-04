import { Router } from "express";
import { prisma } from "../config/db.js";

const router = Router();

router.get("/", async (_req, res) => {
  const start = Date.now();

  try {
    // Use ORM query instead of raw SQL to avoid PrismaPg adapter issues
    await prisma.project.findFirst();

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