import type { PreviewSection } from "@/content/preview";

interface SectionPreviewProps {
  section: PreviewSection;
}

function SectionPreview({ section }: SectionPreviewProps) {
  return (
    <section className="section-preview" id={section.id}>
      <p className="section-label">{section.label}</p>
      <h2>{section.title}</h2>
      <p>{section.description}</p>

      {section.meta && (
        <div className="preview-card" aria-label={`${section.title} preview`}>
          {section.meta.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      )}
    </section>
  );
}

export default SectionPreview;
