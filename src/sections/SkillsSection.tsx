import { portfolioData } from "@/content/data";
import SectionShell from "@/sections/SectionShell";

function SkillsSection() {
  return (
    <SectionShell
      id="skills"
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
