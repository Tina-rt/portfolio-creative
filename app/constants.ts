import { type CVData } from "./types";

export const RESUME_DATA: CVData = {
  name: "TINA HUBERT",
  role: "FULLSTACK ENGINEER",
  location: "Antananarivo, Madagascar",
  email: "rtinahubert@gmail.com",
  phone: "+261 34 77 628 54",
  site: "https://tina-dev.netlify.app",
  summary:
    "Software developer with 2+ years in frontend/full-stack development. Proficient in TypeScript, Python, Vue.js, and NuxtJS. Seeking international opportunities. Edgy problem solver building scalable solutions.",
  experience: [
    {
      role: "Frontend VueJS Developer",
      company: "The Greenshot (Belgium/Remote)",
      period: "Dec 2023 - Present",
      description:
        "Maintaining Vue2/Vue3 applications with TypeScript. Implementing Figma designs and GraphQL APIs using Apollo. Obsessed with code quality and user experience.",
    },
    {
      role: "Python Data Scraper",
      company: "Alfred AI (Freelance)",
      period: "Sept 2025 - Nov 2025",
      description:
        "Scraped thousands of products. Engineered Python ETL pipelines to structure complex data into Supabase PostgreSQL.",
    },
    {
      role: "Full Stack NuxtJS Developer",
      company: "Techcare (Freelance)",
      period: "Jul 2024 - Nov 2024",
      description:
        "Built robust full-stack applications with NuxtJS frontend and ExpressJS/PostgreSQL backend, containerized with Docker.",
    },
  ],
  projects: [
    {
      title: "KAIROT",
      date: "Sept 2024",
      description:
        "Audio to Text SaaS. Full-stack transcription service featuring Flask backend, Nuxt frontend, and Firebase.",
      tech: ["Flask", "Nuxt", "Gemini API", "Firebase"],
      image: "https://picsum.photos/800/600?grayscale&blur=2",
      cover_image: "https://picsum.photos/800/600?grayscale&blur=2",
      link: "https://github.com",
    },
    {
      title: "E-COMMERCE MICROSERVICES",
      date: "Oct 2025",
      description:
        "Rebuilding monolithic backend architecture into scalable microservices using NestJS deployed on AWS.",
      tech: ["NestJS", "AWS", "Microservices"],
      image: "https://picsum.photos/800/600?grayscale",
      cover_image: "https://picsum.photos/800/600?grayscale",
      link: "",
    },
  ],
  awards: [
    {
      title: "The Red Shalk Hackathon",
      date: "Nov 2023",
      place: "2nd Place",
      description: "Marketing solution for food delivery (Vue.js, Node.js).",
    },
    {
      title: "Inter University Hackathon",
      date: "Mar 2023",
      place: "3rd Place",
      description: "Queue management application (Flutter, Django, React).",
    },
  ],
  skills: {
    languages: ["TypeScript", "Python", "PHP", "SQL", "HTML/CSS"],
    frameworks: ["Vue.js", "NuxtJS", "React", "Django", "FastAPI", "NestJS"],
    tools: ["Docker", "AWS (EC2, S3)", "Git", "Firebase", "Postman"],
  },
  socials: {
    github: "https://github.com/tinart",
    linkedin: "https://linkedin.com/in/tina-hubert",
    twitter: "https://twitter.com/tinahubert",
  },
};
