import { portfolioData } from "@/content/data";
import SectionShell from "@/sections/SectionShell";

function ProjectsSection() {
  return (
    <SectionShell
      id="projects"
      index={3}
      label="projects"
      title="Selected projects"
    >
      <div className="project-list">
        {portfolioData.projects.map((project) => (
          <article className="project-card" key={project.id}>
            <header>
              <div>
                <h3>{project.name}</h3>
                <p>
                  {project.dates.start} — {project.dates.end}
                </p>
              </div>
              <div className="card-links">
                {project.links.map((link) => (
                  <a
                    href={link.url}
                    key={link.label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {link.label.toLowerCase()}
                  </a>
                ))}
              </div>
            </header>

            <p>{project.highlights.join(" ")}</p>

            <div className="tag-list">
              {project.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export default ProjectsSection;
