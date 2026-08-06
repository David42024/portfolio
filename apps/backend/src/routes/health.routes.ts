import { Router } from "express";
import { prisma } from "../config/db";
import { env } from "../config/env";
import { Resend } from "resend";

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
    console.error("Health check DB error:", error);
    res.status(200).json({
      status: "degraded",
      timestamp: new Date().toISOString(),
      responseTime: `${Date.now() - start}ms`,
      database: "disconnected",
    });
  }
});


// Diagnóstico del envío de correo (Resend). Devuelve si está configurado y si
// la API key es válida, sin enviar ningún email.
router.get("/email", async (_req, res) => {
  const { RESEND_API_KEY, CONTACT_EMAIL, CONTACT_EMAIL_FROM } = env;

  const result: Record<string, unknown> = {
    hasApiKey: Boolean(RESEND_API_KEY),
    hasContactEmail: Boolean(CONTACT_EMAIL),
    emailConfigured: Boolean(RESEND_API_KEY && CONTACT_EMAIL),
    from: CONTACT_EMAIL_FROM || "Portfolio <onboarding@resend.dev>",
  };

  if (RESEND_API_KEY) {
    const client = new Resend(RESEND_API_KEY);
    try {
      const list = await client.domains.list();
      result.keyStatus = "valid";
      result.domains = Array.isArray(list.data)
        ? list.data.map((d) => ({ name: d.name, status: d.status }))
        : [];
    } catch (error) {
      result.keyStatus = "invalid";
      result.error = error instanceof Error ? error.message : String(error);
    }
  } else {
    result.keyStatus = "missing";
  }

  res.status(200).json({ status: "ok", ...result });
});


export default router;