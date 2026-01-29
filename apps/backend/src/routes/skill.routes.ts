import {Router} from "express";
import * as skillController from "../controllers/skill.controller";

const router = Router();


router.get("/", skillController.getAllSkills);
router.get("/categories", skillController.getSkillCategories);
router.get("/categories/:id", skillController.getSkillsByCategory);
router.get("/:id", skillController.getSkillById);


export default router;