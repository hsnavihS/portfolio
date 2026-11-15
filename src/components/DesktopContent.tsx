import type { PortfolioSectionId } from "@/content/sections";
import AboutSection from "@/sections/AboutSection";
import BackgroundSection from "@/sections/BackgroundSection";
import ContactSection from "@/sections/ContactSection";
import ExperienceSection from "@/sections/ExperienceSection";
import ProjectsSection from "@/sections/ProjectsSection";
import SkillsSection from "@/sections/SkillsSection";

interface DesktopContentProps {
  hidden: boolean;
  section: PortfolioSectionId;
}

function DesktopContent({ hidden, section }: DesktopContentProps) {
  const sections = {
    home: <AboutSection includeAnchor={false} />,
    experience: <ExperienceSection includeAnchor={false} />,
    projects: <ProjectsSection includeAnchor={false} />,
    skills: <SkillsSection includeAnchor={false} />,
    education: <BackgroundSection includeAnchor={false} />,
    contact: <ContactSection includeAnchor={false} />,
  };

  return (
    <div
      aria-hidden={hidden}
      className="desktop-content"
      inert={hidden ? true : undefined}
    >
      {sections[section]}
    </div>
  );
}

export default DesktopContent;
