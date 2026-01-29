import { handleFetch } from "../common/controllers/handleFetch";
import { ExperienceRepository } from "../repositories/experience.repository";

const experienceRepository = new ExperienceRepository();

export const getAllExperiences =  handleFetch(
    () => experienceRepository.findAll(),
    "Error fetching all experiences"
);

export const getExperienceById = handleFetch(
    (req) => experienceRepository.findById(req.params.id),
    "Error fetching experience by ID"
);
