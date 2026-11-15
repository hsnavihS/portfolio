import { portfolioData } from "@/content/data";
import SectionShell from "@/sections/SectionShell";

function ContactSection() {
  const { identity } = portfolioData;

  return (
    <SectionShell
      id="contact"
      index={6}
      label="contact"
      title="Start a conversation"
    >
      <p className="section-intro">
        Reach out by email or find me on the platforms below.
      </p>

      <div className="contact-links">
        {identity.email && (
          <a href={`mailto:${identity.email}`}>{identity.email}</a>
        )}
        {identity.links.map((link) => (
          <a href={link.url} key={link.label} rel="noreferrer" target="_blank">
            {link.label}
          </a>
        ))}
      </div>
    </SectionShell>
  );
}

export default ContactSection;
