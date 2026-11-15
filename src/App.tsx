import { useCallback, useState } from "react";
import DesktopContent from "@/components/DesktopContent";
import DesktopSidebar from "@/components/DesktopSidebar";
import MobileHeader from "@/components/MobileHeader";
import MobilePortfolio from "@/components/MobilePortfolio";
import TerminalPreview from "@/components/TerminalPreview";
import type { PortfolioSectionId } from "@/content/sections";
import useSectionNavigation from "@/hooks/useSectionNavigation";
import useTerminalSession from "@/hooks/useTerminalSession";

function App() {
  const { activeSection, navigateTo } = useSectionNavigation();
  const [terminalOverride, setTerminalOverride] = useState<{
    section: PortfolioSectionId;
    expanded: boolean;
  } | null>(null);
  const terminalExpanded =
    terminalOverride?.section === activeSection
      ? terminalOverride.expanded
      : activeSection === "home";

  const navigateWorkspace = useCallback(
    (section: PortfolioSectionId) => {
      setTerminalOverride({
        section,
        expanded: section === "home",
      });
      navigateTo(section);
    },
    [navigateTo],
  );

  const terminalSession = useTerminalSession(navigateWorkspace);

  return (
    <div className="portfolio-shell">
      <DesktopSidebar
        activeSection={activeSection}
        onSelect={navigateWorkspace}
      />
      <MobileHeader />

      <main className="main-pane">
        <div
          className={`desktop-workspace ${
            terminalExpanded ? "is-terminal-expanded" : "is-terminal-docked"
          }`}
        >
          <DesktopContent hidden={terminalExpanded} section={activeSection} />
          <TerminalPreview
            expanded={terminalExpanded}
            onToggle={() =>
              setTerminalOverride({
                section: activeSection,
                expanded: !terminalExpanded,
              })
            }
            session={terminalSession}
          />
        </div>
        <MobilePortfolio />
      </main>
    </div>
  );
}

export default App;
