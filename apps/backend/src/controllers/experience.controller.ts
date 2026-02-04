import { handleFetch } from "../common/controllers/handleFetch.js";
import { CACHE_KEYS } from "../config/redis.js";
import { ExperienceRepository } from "../repositories/experience.repository.js";

const experienceRepository = new ExperienceRepository();

export const getAllExperiences =  handleFetch(
    () => experienceRepository.findAll(),
    "Error fetching all experiences",
    { cacheKeyFn: CACHE_KEYS.EXPERIENCES }
);

export const getExperienceById = handleFetch(
    (req) => experienceRepository.findById(req.params.id),
    "Error fetching experience by ID"
);
