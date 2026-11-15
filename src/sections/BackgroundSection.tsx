import { portfolioData } from "@/content/data";
import SectionShell from "@/sections/SectionShell";

interface BackgroundSectionProps {
  includeAnchor?: boolean;
}

function BackgroundSection({ includeAnchor = true }: BackgroundSectionProps) {
  return (
    <SectionShell
      id="education"
      includeAnchor={includeAnchor}
      index={5}
      label="education"
      title="Education and more"
    >
      <div className="background-groups">
        <div className="background-group">
          <h3>Education</h3>
          {portfolioData.education.map((item) => (
            <article className="compact-entry" key={item.degree}>
              <strong>{item.degree}</strong>
              <span>{item.institution}</span>
              <span>{item.detail}</span>
              <span>
                {item.score} · {item.graduation}
              </span>
            </article>
          ))}
        </div>

        <div className="background-group">
          <h3>Activities</h3>
          {portfolioData.activities.map((item) => (
            <article className="compact-entry" key={item.id}>
              <strong>{item.title}</strong>
              <span>
                {item.dates.start} — {item.dates.end}
              </span>
              <p>{item.highlights.join(" ")}</p>
            </article>
          ))}
        </div>

        <div className="background-group">
          <h3>Awards</h3>
          {portfolioData.awards.map((item) => (
            <article className="compact-entry" key={item.id}>
              <strong>{item.title}</strong>
              <span>{item.date}</span>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export default BackgroundSection;
