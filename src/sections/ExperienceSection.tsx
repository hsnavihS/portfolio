import { portfolioData } from "@/content/data";
import SectionShell from "@/sections/SectionShell";

function ExperienceSection() {
  return (
    <SectionShell
      id="experience"
      index={2}
      label="experience"
      title="Work experience"
    >
      <div className="timeline">
        {portfolioData.experience.map((item) => (
          <article className="timeline-entry" key={item.id}>
            <header>
              <div>
                <h3>{item.role}</h3>
                <p>{item.organization}</p>
              </div>
              <span>
                {item.dates.start} — {item.dates.end}
              </span>
            </header>

            <ul className="highlight-list">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export default ExperienceSection;
