import { portfolioSections } from "@/content/sections";

function DesktopSidebar() {
  return (
    <aside className="desktop-sidebar">
      <div>
        <p className="brand-name">shivansh shukla</p>
        <p className="brand-role">software engineer</p>
      </div>

      <nav className="sidebar-navigation" aria-label="Portfolio preview">
        {portfolioSections.map((section, index) => (
          <div
            className={`navigation-item${index === 0 ? " is-active" : ""}`}
            key={section.id}
          >
            <span className="navigation-marker" aria-hidden="true">
              {index === 0 ? ">" : ""}
            </span>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{section.navigationLabel}</span>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-links">
          <span>github</span>
          <span>linkedin</span>
          <span>download resume</span>
        </div>
        <span className="theme-label">theme: noir</span>
      </div>
    </aside>
  );
}

export default DesktopSidebar;
