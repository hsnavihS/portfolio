import { portfolioData } from "@/content/data";
import SectionShell from "@/sections/SectionShell";

interface SkillsSectionProps {
  includeAnchor?: boolean;
}

function SkillsSection({ includeAnchor = true }: SkillsSectionProps) {
  return (
    <SectionShell
      id="skills"
      includeAnchor={includeAnchor}
      index={4}
      label="skills"
      title="Technical toolkit"
    >
      <div className="skill-groups">
        {portfolioData.skills.map((group) => (
          <article className="skill-group" key={group.name}>
            <h3>{group.name}</h3>
            <p>{group.items.join(" · ")}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export default SkillsSection;
