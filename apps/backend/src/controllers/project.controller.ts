import { handleFetch } from "../common/controllers/handleFetch";
import { ProjectRepository } from "../repositories/project.repository";
import { CACHE_KEYS } from "../config/redis";

const projectRepository = new ProjectRepository();

export const getAllProjects =  handleFetch(
    () => projectRepository.findAll(),
    "Error fetching all projects",
    { cacheKeyFn: CACHE_KEYS.PROJECTS }
);

export const getFeaturedProjects = handleFetch(
  () => projectRepository.findFeatured(),
  "Error fetching featured projects",
  { cacheKeyFn: CACHE_KEYS.PROJECTS_FEATURED }
);

export const getProjectBySlug = handleFetch(
    (req) => projectRepository.findBySlug(req.params.slug),
    "Error fetching project by slug",
    { cacheKeyFn: (req) => CACHE_KEYS.PROJECT(req.params.slug) }

);

export const getProjectById = handleFetch(
    (req) => projectRepository.findById(req.params.id),
    "Error fetching project by ID"    
);
