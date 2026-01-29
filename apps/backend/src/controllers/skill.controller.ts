import { handleFetch } from "../common/controllers/handleFetch";
import { SkillRepository } from "../repositories/skill.repository";

const skillRepository = new SkillRepository();

export const getAllSkills =  handleFetch(
    () => skillRepository.findAll(),
    "Error fetching all skills"
);

export const getSkillCategories = handleFetch(
  () => skillRepository.findCategories(),
  "Error fetching skill categories"
);

export const getSkillsByCategory = handleFetch(
    (req) => skillRepository.findByCategory(req.params.id),
    "Error fetching skill by category"
);

export const getSkillById = handleFetch(
    (req) => skillRepository.findById(req.params.id),
    "Error fetching skill by ID"
);
