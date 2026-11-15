import ResumeLink from "@/components/ResumeLink";

function MobileHeader() {
  return (
    <header className="mobile-header">
      <div>
        <p className="mobile-name">Shivansh Shukla</p>
        <p className="mobile-role">software engineer</p>
      </div>

      <div className="mobile-header-meta" aria-label="Portfolio options">
        <ResumeLink className="text-link">resume</ResumeLink>
        <span>noir</span>
      </div>
    </header>
  );
}

export default MobileHeader;
