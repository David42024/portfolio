//const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
//const API_URL = `${APP_URL}/v1`;
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
  error?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      ...options,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Error en la petición");
    }

    return data;
  }

  // ==================== PROJECTS ====================

  async getProjects() {
    return this.request<Project[]>("/projects");
  }

  async getFeaturedProjects() {
    return this.request<Project[]>("/projects/featured");
  }

  async getProjectBySlug(slug: string) {
    return this.request<Project>(`/projects/${slug}`);
  }

  // ==================== SKILLS ====================

  async getSkills() {
    return this.request<SkillCategory[]>("/skills");
  }

  async getSkillsCategories() {
    return this.request<SkillCategory[]>("/skills/categories");
  }

  async getSkillsByCategory(id: string) {
    return this.request<Skill[]>(`/skills/categories/${id}`);
  }

  // ==================== CERTIFICATES ====================

  async getCertificates() {
    return this.request<Certificate[]>("/certificates");
  }

  async getCertificateById(id: string) {
    return this.request<Certificate>(`/certificates/${id}`);
  }

  // ==================== EXPERIENCES ====================

  async getExperiences() {
    return this.request<Experience[]>("/experiences");
  }

  // ==================== CONTACT ====================

  async sendContact(data: ContactForm) {
    return this.request<{ id: string; createdAt: string }>("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // ==================== HEALTH ====================

  async healthCheck() {
    return this.request<{ status: string; database: string }>("/health");
  }
}

export const api = new ApiClient(API_URL);

// ==================== TYPES ====================

export interface Technology {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  technologies: Technology[];
  createdAt: string;
  updatedAt: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  order: number;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  icon: string;
  categoryId: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string | null;
  imageUrl: string | null;
  skills: Skill[];
  createdAt: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  current: boolean;
  order: number;
  technologies: Technology[];
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}