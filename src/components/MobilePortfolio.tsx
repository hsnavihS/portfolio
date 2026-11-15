import AboutSection from "@/sections/AboutSection";
import BackgroundSection from "@/sections/BackgroundSection";
import ContactSection from "@/sections/ContactSection";
import ExperienceSection from "@/sections/ExperienceSection";
import ProjectsSection from "@/sections/ProjectsSection";
import SkillsSection from "@/sections/SkillsSection";

function MobilePortfolio() {
  return (
    <div className="mobile-content">
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <BackgroundSection />
      <ContactSection />
    </div>
  );
}

export default MobilePortfolio;
