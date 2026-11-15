export interface PortfolioLink {
  label: string;
  url: string;
}

export interface DateRange {
  start: string;
  end: string;
}

export interface Identity {
  name: string;
  headline: string;
  summary: string;
  location: string;
  email?: string;
  phone?: string;
  links: PortfolioLink[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  detail: string;
  score: string;
  graduation: string;
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  dates: DateRange;
  highlights: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  dates: DateRange;
  highlights: string[];
  links: PortfolioLink[];
  technologies: string[];
}

export interface ActivityItem {
  id: string;
  title: string;
  dates: DateRange;
  highlights: string[];
}

export interface AwardItem {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface PortfolioData {
  identity: Identity;
  education: EducationItem[];
  skills: SkillGroup[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  activities: ActivityItem[];
  awards: AwardItem[];
  resume: {
    sourceFile: string;
    sourceModifiedAt: string;
    pageCount: number;
  };
}
