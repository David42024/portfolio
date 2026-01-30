import { handleFetch } from "../common/controllers/handleFetch";
import { SkillRepository } from "../repositories/skill.repository";
import { CACHE_KEYS } from "../config/redis";

const skillRepository = new SkillRepository();

export const getAllSkills =  handleFetch(
    () => skillRepository.findAll(),
    "Error fetching all skills",
    { cacheKeyFn: CACHE_KEYS.SKILLS }
);

export const getSkillCategories = handleFetch(
  () => skillRepository.findCategories(),
  "Error fetching skill categories",
  { cacheKeyFn: CACHE_KEYS.SKILLS_CATEGORIES }
);

export const getSkillsByCategory = handleFetch(
    (req) => skillRepository.findByCategory(req.params.id),
    "Error fetching skill by category"
);

export const getSkillById = handleFetch(
    (req) => skillRepository.findById(req.params.id),
    "Error fetching skill by ID"
);
