import { copyFile, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { PDFParse } from "pdf-parse";
import { format } from "prettier";

const root = process.cwd();
const resumePath = resolve(root, "resume.pdf");
const overridesPath = resolve(root, "src/content/portfolio-overrides.json");
const rawOutputPath = resolve(root, "src/generated/resume.txt");
const dataOutputPath = resolve(root, "src/generated/portfolio.json");
const publicResumePath = resolve(root, "public/resume.pdf");

const sectionNames = [
  "EDUCATION",
  "TECHNICAL SKILLS",
  "EXPERIENCE",
  "PROJECTS",
  "ACTIVITIES",
  "AWARDS",
];

const datedRangePattern =
  /^(.*?)\s+([A-Z][a-z]{2} \d{4})\s+[–-]\s+(Present|[A-Z][a-z]{2} \d{4})$/;

function fail(message) {
  throw new Error(`Portfolio generation failed: ${message}`);
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ensureUrl(value) {
  const url = value.startsWith("http") ? value : `https://${value}`;

  try {
    return new URL(url).toString();
  } catch {
    fail(`Invalid URL: ${value}`);
  }
}

function normalizeText(text) {
  return text
    .replace(/\r/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !/^-- \d+ of \d+ --$/.test(line))
    .join("\n");
}

function splitSections(text) {
  const sections = { header: [] };
  let current = "header";

  for (const line of text.split("\n")) {
    const heading = line.endsWith(":") ? line.slice(0, -1) : "";

    if (sectionNames.includes(heading)) {
      current = heading;
      sections[current] = [];
      continue;
    }

    sections[current].push(line);
  }

  for (const name of ["header", ...sectionNames]) {
    if (!sections[name]?.length) {
      fail(`Missing or empty ${name} section`);
    }
  }

  return sections;
}

function parseContactLine(line) {
  const contacts = line.split("|").map((value) => value.trim());
  const email = contacts.find((value) => value.includes("@"));
  const phone = contacts.find((value) => /^\+?[\d-]+$/.test(value));
  const links = contacts
    .filter((value) => value.includes(".com/"))
    .map((value) => ({
      label: value.includes("linkedin") ? "LinkedIn" : "GitHub",
      url: ensureUrl(value),
    }));

  if (!email || !phone || links.length !== 2) {
    fail("Could not parse header contact information");
  }

  return { email, phone, links };
}

function parseEducation(lines) {
  if (lines.length !== 2) {
    fail("Education section has an unexpected shape");
  }

  const institutionMatch = lines[0].match(/^(.*?)\s+(\d+\.\d+\/\d+\.\d+)$/);
  const degreeMatch = lines[1].match(/^(.*?)\s+([A-Z][a-z]+ \d{4})$/);

  if (!institutionMatch || !degreeMatch) {
    fail("Could not parse education");
  }

  const [degree, detail = ""] = degreeMatch[1]
    .split("|")
    .map((value) => value.trim());

  return [
    {
      institution: institutionMatch[1],
      degree,
      detail,
      score: institutionMatch[2],
      graduation: degreeMatch[2],
    },
  ];
}

function parseSkills(lines) {
  return lines.map((line) => {
    const match = line.match(/^([^:]+):\s*(.+)$/);

    if (!match) {
      fail(`Could not parse skill group: ${line}`);
    }

    return {
      name: match[1],
      items: match[2]
        .replace(/\.$/, "")
        .split(",")
        .map((value) => value.trim()),
    };
  });
}

function parseBulletedEntries(lines, parseHeader) {
  const entries = [];
  let current;

  for (const line of lines) {
    const header = parseHeader(line);

    if (header) {
      if (current) {
        entries.push(current);
      }

      current = { ...header, highlights: [] };
      continue;
    }

    if (!current) {
      fail(`Found content before an entry header: ${line}`);
    }

    if (line.startsWith("- ")) {
      current.highlights.push(line.slice(2));
      continue;
    }

    if (!current.highlights.length) {
      fail(`Found an unexpected entry line: ${line}`);
    }

    const lastIndex = current.highlights.length - 1;
    current.highlights[lastIndex] += ` ${line}`;
  }

  if (current) {
    entries.push(current);
  }

  if (!entries.length || entries.some((entry) => !entry.highlights.length)) {
    fail("A bulleted section contains an empty entry");
  }

  return entries;
}

function parseExperience(lines) {
  return parseBulletedEntries(lines, (line) => {
    const match = line.match(
      /^(.*?):\s+(.+?)\s+([A-Z][a-z]{2} \d{4})\s+[–-]\s+(Present|[A-Z][a-z]{2} \d{4})$/,
    );

    if (!match) {
      return null;
    }

    return {
      id: slugify(`${match[1]}-${match[2]}`),
      organization: match[1],
      role: match[2],
      dates: { start: match[3], end: match[4] },
    };
  });
}

function parseProjectLinks(line) {
  return line.split("|").map((entry) => {
    const match = entry.trim().match(/^([^:]+):\s*(.+)$/);

    if (!match) {
      fail(`Could not parse project link: ${entry}`);
    }

    return {
      label: match[1] === "Github" ? "GitHub" : match[1],
      url: ensureUrl(match[2]),
    };
  });
}

function parseProjects(lines) {
  const entries = [];
  let current;

  for (const line of lines) {
    const match = line.match(datedRangePattern);

    if (match) {
      if (current) {
        entries.push(current);
      }

      current = {
        id: slugify(match[1]),
        name: match[1],
        dates: { start: match[2], end: match[3] },
        highlights: [],
        links: [],
        technologies: [],
      };
      continue;
    }

    if (!current) {
      fail(`Found project content before a project header: ${line}`);
    }

    if (/^Github:/.test(line)) {
      current.links = parseProjectLinks(line);
      continue;
    }

    if (line.startsWith("- ")) {
      current.highlights.push(line.slice(2));
      continue;
    }

    if (!current.highlights.length) {
      fail(`Found an unexpected project line: ${line}`);
    }

    const lastIndex = current.highlights.length - 1;
    current.highlights[lastIndex] += ` ${line}`;
  }

  if (current) {
    entries.push(current);
  }

  if (
    !entries.length ||
    entries.some((entry) => !entry.highlights.length || !entry.links.length)
  ) {
    fail("A project is missing highlights or links");
  }

  return entries;
}

function parseActivities(lines) {
  return parseBulletedEntries(lines, (line) => {
    const match = line.match(datedRangePattern);

    if (!match) {
      return null;
    }

    return {
      id: slugify(match[1]),
      title: match[1],
      dates: { start: match[2], end: match[3] },
    };
  });
}

function parseAwards(lines) {
  if (lines.length % 2 !== 0) {
    fail("Awards section has an unexpected shape");
  }

  const awards = [];

  for (let index = 0; index < lines.length; index += 2) {
    const match = lines[index].match(/^(.*?)\s+([A-Z][a-z]{2} \d{4})$/);

    if (!match) {
      fail(`Could not parse award: ${lines[index]}`);
    }

    awards.push({
      id: slugify(match[1]),
      title: match[1],
      date: match[2],
      description: lines[index + 1],
    });
  }

  return awards;
}

function applyOverrides(data, overrides) {
  const identity = {
    ...data.identity,
    ...overrides.identity,
    email: overrides.contactVisibility.email ? data.identity.email : undefined,
    phone: overrides.contactVisibility.phone ? data.identity.phone : undefined,
  };

  const projects = data.projects.map((project) => ({
    ...project,
    ...(overrides.projects[project.id] ?? {}),
  }));

  return { ...data, identity, projects };
}

function validateData(data) {
  const requiredCollections = [
    "education",
    "skills",
    "experience",
    "projects",
    "activities",
    "awards",
  ];

  if (
    !data.identity.name ||
    !data.identity.headline ||
    !data.identity.summary
  ) {
    fail("Identity is missing required display fields");
  }

  for (const key of requiredCollections) {
    if (!Array.isArray(data[key]) || !data[key].length) {
      fail(`${key} must contain at least one item`);
    }
  }

  for (const link of [
    ...data.identity.links,
    ...data.projects.flatMap((project) => project.links),
  ]) {
    ensureUrl(link.url);
  }
}

async function extractResume() {
  const buffer = await readFile(resumePath);
  const parser = new PDFParse({ data: buffer });

  try {
    return await parser.getText();
  } finally {
    await parser.destroy();
  }
}

async function main() {
  const [result, sourceStats, overridesText] = await Promise.all([
    extractResume(),
    stat(resumePath),
    readFile(overridesPath, "utf8"),
  ]);

  const normalizedText = normalizeText(result.text);
  const sections = splitSections(normalizedText);
  const contacts = parseContactLine(sections.header[1]);
  const overrides = JSON.parse(overridesText);

  const parsedData = {
    identity: {
      name: sections.header[0],
      headline: "",
      summary: "",
      location: "",
      ...contacts,
    },
    education: parseEducation(sections.EDUCATION),
    skills: parseSkills(sections["TECHNICAL SKILLS"]),
    experience: parseExperience(sections.EXPERIENCE),
    projects: parseProjects(sections.PROJECTS),
    activities: parseActivities(sections.ACTIVITIES),
    awards: parseAwards(sections.AWARDS),
    resume: {
      sourceFile: "resume.pdf",
      sourceModifiedAt: sourceStats.mtime.toISOString(),
      pageCount: result.total,
    },
  };

  const portfolioData = applyOverrides(parsedData, overrides);
  validateData(portfolioData);
  const formattedData = await format(JSON.stringify(portfolioData), {
    parser: "json",
  });

  await mkdir(resolve(root, "src/generated"), { recursive: true });

  await Promise.all([
    writeFile(rawOutputPath, `${normalizedText}\n`, "utf8"),
    writeFile(dataOutputPath, formattedData, "utf8"),
    copyFile(resumePath, publicResumePath),
  ]);

  console.log(
    `Generated portfolio data from ${portfolioData.resume.pageCount} PDF page.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
