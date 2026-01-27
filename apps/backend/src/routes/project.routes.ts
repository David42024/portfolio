import {Router} from "express";
import * as projectController from "../controllers/project.controller";

const router = Router();


router.get("/", projectController.getAllProjects);
router.get("/featured", projectController.getFeaturedProjects);
router.get("/slug/:slug", projectController.getProjectBySlug);
router.get("/:id", projectController.getProjectById);


export default router;