import { Router } from "express";
import * as experienceController from "../controllers/experience.controller.js";

const router = Router();

// GET /api/v1/experiences - Listar todas las experiencias
router.get("/", experienceController.getAllExperiences);

// GET /api/v1/experiences/:id - Detalle de experiencia
router.get("/:id", experienceController.getExperienceById);

export default router;