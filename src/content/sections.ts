export const portfolioSections = [
  {
    id: "home",
    navigationLabel: "home",
    command: "about",
  },
  {
    id: "experience",
    navigationLabel: "experience",
    command: "experience",
  },
  {
    id: "projects",
    navigationLabel: "projects",
    command: "projects",
  },
  {
    id: "skills",
    navigationLabel: "skills",
    command: "skills",
  },
  {
    id: "education",
    navigationLabel: "education",
    command: "education",
  },
  {
    id: "contact",
    navigationLabel: "contact",
    command: "contact",
  },
] as const;

export type PortfolioSectionId = (typeof portfolioSections)[number]["id"];

export function isPortfolioSectionId(
  value: string,
): value is PortfolioSectionId {
  return portfolioSections.some((section) => section.id === value);
}
