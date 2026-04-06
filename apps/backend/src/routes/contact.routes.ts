import { Router } from "express";
import * as contactController from "../controllers/contact.controller.js";
import { contactRateLimit } from "../middlewares/rateLimit.js";

const router = Router();

// POST /api/v1/contact - Enviar mensaje de contacto (con rate limiting)
router.post("/", contactRateLimit, contactController.create);

export default router;