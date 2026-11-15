import DesktopSidebar from "@/components/DesktopSidebar";
import MobileHeader from "@/components/MobileHeader";
import SectionPreview from "@/components/SectionPreview";
import TerminalPreview from "@/components/TerminalPreview";
import { previewSections } from "@/content/preview";

function App() {
  return (
    <div className="portfolio-shell">
      <DesktopSidebar />
      <MobileHeader />

      <main className="main-pane">
        <TerminalPreview />

        <div className="mobile-content">
          {previewSections.map((section) => (
            <SectionPreview key={section.id} section={section} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
