export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Project {
  title: string;
  date: string;
  description: string;
  tech: string[];
  image: string; // Placeholder URL
  cover_image?: string;
  link?: string;
}

export interface Award {
  title: string;
  date: string;
  place: string;
  description: string;
}

export interface CVData {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  site: string;
  summary: string;
  experience: Experience[];
  projects: Project[];
  awards: Award[];
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
  };
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}
