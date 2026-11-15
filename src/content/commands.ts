export interface TerminalCommandDefinition {
  name: string;
  aliases?: string[];
  usage: string;
  description: string;
}

export const terminalCommands: TerminalCommandDefinition[] = [
  {
    name: "help",
    usage: "help",
    description: "list available commands",
  },
  {
    name: "about",
    aliases: ["home"],
    usage: "about",
    description: "return to the terminal home",
  },
  {
    name: "experience",
    usage: "experience",
    description: "open work experience",
  },
  {
    name: "projects",
    usage: "projects",
    description: "open selected projects",
  },
  {
    name: "skills",
    usage: "skills",
    description: "open technical skills",
  },
  {
    name: "education",
    usage: "education",
    description: "open education and activities",
  },
  {
    name: "contact",
    usage: "contact",
    description: "open contact information",
  },
  {
    name: "clear",
    usage: "clear",
    description: "clear terminal output",
  },
  {
    name: "github",
    usage: "github",
    description: "open GitHub",
  },
  {
    name: "linkedin",
    usage: "linkedin",
    description: "open LinkedIn",
  },
  {
    name: "open",
    usage: "open <project>",
    description: "open a project link",
  },
  {
    name: "whoami",
    usage: "whoami",
    description: "show profile information",
  },
  {
    name: "pwd",
    usage: "pwd",
    description: "show the current location",
  },
  {
    name: "theme",
    usage: "theme",
    description: "show the active theme",
  },
];

export function findTerminalCommand(name: string) {
  const normalizedName = name.toLowerCase();

  return terminalCommands.find(
    (command) =>
      command.name === normalizedName ||
      command.aliases?.includes(normalizedName),
  );
}
