import { portfolioData } from "@/content/data";
import SectionShell from "@/sections/SectionShell";

function AboutSection() {
  const { identity, experience } = portfolioData;

  return (
    <SectionShell id="home" index={1} label="about" title={identity.headline}>
      <p className="section-intro">{identity.summary}</p>

      <dl className="about-facts">
        <div>
          <dt>currently</dt>
          <dd>{experience[0].organization}</dd>
        </div>
        <div>
          <dt>location</dt>
          <dd>{identity.location}</dd>
        </div>
      </dl>

      <div className="inline-links">
        {identity.links.map((link) => (
          <a href={link.url} key={link.label} rel="noreferrer" target="_blank">
            {link.label.toLowerCase()}
          </a>
        ))}
      </div>
    </SectionShell>
  );
}

export default AboutSection;
