import type { ReactNode } from "react";

interface SectionShellProps {
  id: string;
  index: number;
  label: string;
  title: string;
  children: ReactNode;
}

function SectionShell({
  id,
  index,
  label,
  title,
  children,
}: SectionShellProps) {
  return (
    <section className="portfolio-section" id={id}>
      <p className="section-label">
        {String(index).padStart(2, "0")} / {label}
      </p>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default SectionShell;
