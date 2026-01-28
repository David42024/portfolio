import { handleFetch } from "../common/controllers/handleFetch";
import { projectRepository } from "../repositories/project.repository";


export const getAllProjects =  handleFetch(
    () => projectRepository.findAll(),
    "Error fetching all projects"
);

export const getFeaturedProjects = handleFetch(
  () => projectRepository.findFeatured(),
  "Error fetching featured projects"
);

export const getProjectBySlug = handleFetch(
    (req) => projectRepository.findBySlug(req.params.slug),
    "Error fetching project by slug"
);

export const getProjectById = handleFetch(
    (req) => projectRepository.findById(req.params.id),
    "Error fetching project by ID"
);
