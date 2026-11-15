import ResumeLink from "@/components/ResumeLink";
import { portfolioData } from "@/content/data";
import { formatResumeUpdatedAt } from "@/content/resume";
import SectionShell from "@/sections/SectionShell";

interface ContactSectionProps {
  includeAnchor?: boolean;
}

function ContactSection({ includeAnchor = true }: ContactSectionProps) {
  const { identity } = portfolioData;

  return (
    <SectionShell
      id="contact"
      includeAnchor={includeAnchor}
      index={6}
      label="contact"
      title="Start a conversation"
    >
      <p className="section-intro">
        Reach out by email or find me on the platforms below.
      </p>

      <div className="contact-links">
        <div className="resume-contact">
          <ResumeLink className="text-link">Download résumé</ResumeLink>
          <span>
            updated{" "}
            {formatResumeUpdatedAt(portfolioData.resume.sourceModifiedAt)}
          </span>
        </div>
        {identity.email && (
          <a className="text-link" href={`mailto:${identity.email}`}>
            {identity.email}
          </a>
        )}
        {identity.links.map((link) => (
          <a
            className="text-link"
            href={link.url}
            key={link.label}
            rel="noreferrer"
            target="_blank"
          >
            {link.label}
          </a>
        ))}
      </div>
    </SectionShell>
  );
}

export default ContactSection;
