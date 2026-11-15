import DesktopSidebar from "@/components/DesktopSidebar";
import MobileHeader from "@/components/MobileHeader";
import MobilePortfolio from "@/components/MobilePortfolio";
import TerminalPreview from "@/components/TerminalPreview";

function App() {
  return (
    <div className="portfolio-shell">
      <DesktopSidebar />
      <MobileHeader />

      <main className="main-pane">
        <TerminalPreview />
        <MobilePortfolio />
      </main>
    </div>
  );
}

export default App;
