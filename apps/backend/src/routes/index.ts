import { Router } from "express";
import projectRoutes from "./project.routes";
import skillRoutes from "./skill.routes";
import certificateRoutes from "./certificate.routes";
import experienceRoutes from "./experience.routes";
import contactRoutes from "./contact.routes";
import healthRoutes from "./health.routes";

import revalidateRoutes from "./revalidate.routes";

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