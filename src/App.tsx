import DesktopContent from "@/components/DesktopContent";
import DesktopSidebar from "@/components/DesktopSidebar";
import MobileHeader from "@/components/MobileHeader";
import MobilePortfolio from "@/components/MobilePortfolio";
import TerminalPreview from "@/components/TerminalPreview";
import useSectionNavigation from "@/hooks/useSectionNavigation";

function App() {
  const { activeSection, navigateTo } = useSectionNavigation();

  return (
    <div className="portfolio-shell">
      <DesktopSidebar activeSection={activeSection} onSelect={navigateTo} />
      <MobileHeader />

      <main className="main-pane">
        {activeSection === "home" ? (
          <TerminalPreview />
        ) : (
          <DesktopContent section={activeSection} />
        )}
        <MobilePortfolio />
      </main>
    </div>
  );
}

export default App;
