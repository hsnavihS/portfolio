export interface PreviewSection {
  id: string;
  label: string;
  title: string;
  description: string;
  meta?: string[];
}

export const navigationItems = [
  "home",
  "experience",
  "projects",
  "skills",
  "education",
  "contact",
];

export const previewSections: PreviewSection[] = [
  {
    id: "about",
    label: "01 / about",
    title: "Catchy heading",
    description: "Short about section",
  },
  {
    id: "experience",
    label: "02 / experience",
    title: "Work experience",
    description: "Roles and timeline",
    meta: ["role", "company", "impact"],
  },
  {
    id: "projects",
    label: "03 / projects",
    title: "Projects",
    description: "Project description",
    meta: ["project", "summary", "stack"],
  },
  {
    id: "skills",
    label: "04 / skills",
    title: "Tools/programming languages/skills",
    description: "Tools/programming languages/skills",
  },
  {
    id: "contact",
    label: "05 / contact",
    title: "Contact info",
    description: "Email, phone, linkedin, github",
  },
];
