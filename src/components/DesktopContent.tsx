import type { PortfolioSectionId } from "@/content/sections";
import BackgroundSection from "@/sections/BackgroundSection";
import ContactSection from "@/sections/ContactSection";
import ExperienceSection from "@/sections/ExperienceSection";
import ProjectsSection from "@/sections/ProjectsSection";
import SkillsSection from "@/sections/SkillsSection";

interface DesktopContentProps {
  section: Exclude<PortfolioSectionId, "home">;
}

function DesktopContent({ section }: DesktopContentProps) {
  const sections = {
    experience: <ExperienceSection includeAnchor={false} />,
    projects: <ProjectsSection includeAnchor={false} />,
    skills: <SkillsSection includeAnchor={false} />,
    education: <BackgroundSection includeAnchor={false} />,
    contact: <ContactSection includeAnchor={false} />,
  };

  return <div className="desktop-content">{sections[section]}</div>;
}

export default DesktopContent;
