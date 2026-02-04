import { Router } from "express";
import projectRoutes from "./project.routes.js";
import skillRoutes from "./skill.routes.js";
import certificateRoutes from "./certificate.routes.js";
import experienceRoutes from "./experience.routes.js";
import contactRoutes from "./contact.routes.js";
import healthRoutes from "./health.routes.js";

import revalidateRoutes from "./revalidate.routes.js";

const router = Router();

// Health check
router.use("/health", healthRoutes);

// Recursos
router.use("/projects", projectRoutes);
router.use("/skills", skillRoutes);
router.use("/certificates", certificateRoutes);
router.use("/experiences", experienceRoutes);
router.use("/contact", contactRoutes);
router.use("/revalidate", revalidateRoutes);

export default router;