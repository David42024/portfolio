import { Router } from "express";
import * as contactController from "../controllers/contact.controller";

const router = Router();

// POST /api/v1/contact - Enviar mensaje de contacto
router.post("/", contactController.create);

export default router;