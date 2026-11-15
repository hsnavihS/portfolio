import { portfolioSections } from "@/content/sections";
import type { PortfolioSectionId } from "@/content/sections";
import { portfolioData } from "@/content/data";
import ResumeLink from "@/components/ResumeLink";

interface DesktopSidebarProps {
  activeSection: PortfolioSectionId;
  onSelect: (section: PortfolioSectionId) => void;
}

function DesktopSidebar({ activeSection, onSelect }: DesktopSidebarProps) {
  return (
    <aside className="desktop-sidebar">
      <div>
        <p className="brand-name">shivansh shukla</p>
        <p className="brand-role">software engineer</p>
      </div>

      <nav className="sidebar-navigation" aria-label="Portfolio preview">
        {portfolioSections.map((section, index) => (
          <button
            aria-current={activeSection === section.id ? "page" : undefined}
            className={`navigation-item${
              activeSection === section.id ? " is-active" : ""
            }`}
            key={section.id}
            onClick={() => onSelect(section.id)}
            type="button"
          >
            <span className="navigation-marker" aria-hidden="true">
              {activeSection === section.id ? ">" : ""}
            </span>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{section.navigationLabel}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-links">
          {portfolioData.identity.links.map((link) => (
            <a
              className="text-link"
              href={link.url}
              key={link.label}
              rel="noreferrer"
              target="_blank"
            >
              {link.label.toLowerCase()}
            </a>
          ))}
          <ResumeLink className="text-link">download resume</ResumeLink>
        </div>
        <span className="theme-label">theme: noir</span>
      </div>
    </aside>
  );
}

export default DesktopSidebar;
