import { useCallback, useRef, useState, type KeyboardEvent } from "react";
import { findTerminalCommand, terminalCommands } from "@/content/commands";
import { portfolioData } from "@/content/data";
import type { PortfolioSectionId } from "@/content/sections";

export interface TerminalEntry {
  id: number;
  command: string;
  lines: string[];
  output?: "text" | "help" | "whoami";
  tone?: "normal" | "error";
}

export interface TerminalSession {
  entries: TerminalEntry[];
  input: string;
  setInput: (value: string) => void;
  submit: () => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

interface CommandResult {
  lines: string[];
  output?: TerminalEntry["output"];
  tone?: TerminalEntry["tone"];
  clear?: boolean;
}

const navigationCommands: Record<string, PortfolioSectionId> = {
  about: "home",
  home: "home",
  experience: "experience",
  projects: "projects",
  skills: "skills",
  education: "education",
  contact: "contact",
};

function openExternalUrl(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function normalizeProjectQuery(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function useTerminalSession(
  navigateTo: (section: PortfolioSectionId) => void,
): TerminalSession {
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [input, setInputState] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const draftInput = useRef("");
  const nextEntryId = useRef(1);

  const runCommand = useCallback(
    (rawCommand: string): CommandResult => {
      const [commandName, ...args] = rawCommand.trim().split(/\s+/);
      const command = findTerminalCommand(commandName);

      if (!command) {
        return {
          lines: [
            `command not found: ${commandName}`,
            "run 'help' to see available commands",
          ],
          tone: "error",
        };
      }

      const navigationTarget = navigationCommands[commandName.toLowerCase()];
      if (navigationTarget) {
        navigateTo(navigationTarget);
        return {
          lines: [
            navigationTarget === "home"
              ? "returned home"
              : `opened ${navigationTarget}`,
          ],
        };
      }

      switch (command.name) {
        case "help":
          return {
            lines: [],
            output: "help",
          };
        case "clear":
          return { lines: [], clear: true };
        case "github": {
          const link = portfolioData.identity.links.find(
            (item) => item.label === "GitHub",
          );
          if (!link) {
            return { lines: ["GitHub link is unavailable"], tone: "error" };
          }
          openExternalUrl(link.url);
          return { lines: ["opening GitHub..."] };
        }
        case "linkedin": {
          const link = portfolioData.identity.links.find(
            (item) => item.label === "LinkedIn",
          );
          if (!link) {
            return { lines: ["LinkedIn link is unavailable"], tone: "error" };
          }
          openExternalUrl(link.url);
          return { lines: ["opening LinkedIn..."] };
        }
        case "open": {
          if (!args.length) {
            return {
              lines: [
                "missing project name",
                "usage: open <project>",
                `available: ${portfolioData.projects
                  .map((project) => project.id)
                  .join(", ")}`,
              ],
              tone: "error",
            };
          }

          const query = normalizeProjectQuery(args.join(" "));
          const matches = portfolioData.projects.filter(
            (project) => project.id === query || project.id.startsWith(query),
          );

          if (matches.length !== 1) {
            return {
              lines: [
                matches.length
                  ? `project name is ambiguous: ${query}`
                  : `project not found: ${query}`,
                `available: ${portfolioData.projects
                  .map((project) => project.id)
                  .join(", ")}`,
              ],
              tone: "error",
            };
          }

          const project = matches[0];
          const link =
            project.links.find((item) => item.label === "Live") ??
            project.links[0];
          openExternalUrl(link.url);
          return { lines: [`opening ${project.name}...`] };
        }
        case "whoami":
          return {
            lines: [],
            output: "whoami",
          };
        case "pwd":
          return { lines: ["/home/shivansh/portfolio"] };
        case "theme":
          return { lines: ["noir"] };
        default:
          return {
            lines: [`command is not implemented: ${command.name}`],
            tone: "error",
          };
      }
    },
    [navigateTo],
  );

  const submit = useCallback(() => {
    const command = input.trim();
    if (!command) {
      return;
    }

    setCommandHistory((current) => [...current, command]);
    setHistoryIndex(null);
    draftInput.current = "";
    setInputState("");

    const result = runCommand(command);
    if (result.clear) {
      setEntries([]);
      return;
    }

    setEntries((current) => [
      ...current,
      {
        id: nextEntryId.current++,
        command,
        lines: result.lines,
        output: result.output ?? "text",
        tone: result.tone ?? "normal",
      },
    ]);
  }, [input, runCommand]);

  const setInput = useCallback(
    (value: string) => {
      setInputState(value);
      if (historyIndex !== null) {
        setHistoryIndex(null);
        draftInput.current = value;
      }
    },
    [historyIndex],
  );

  const completeInput = useCallback(() => {
    const trimmedInput = input.trimStart();
    const [commandName, ...args] = trimmedInput.split(/\s+/);

    if (args.length || trimmedInput.endsWith(" ")) {
      if (commandName.toLowerCase() !== "open") {
        return;
      }

      const prefix = normalizeProjectQuery(args.join(" "));
      const matches = portfolioData.projects
        .map((project) => project.id)
        .filter((id) => id.startsWith(prefix));

      if (matches.length === 1) {
        setInputState(`open ${matches[0]}`);
        setHistoryIndex(null);
      }
      return;
    }

    const commandNames = terminalCommands.flatMap((command) => [
      command.name,
      ...(command.aliases ?? []),
    ]);
    const matches = commandNames.filter((name) =>
      name.startsWith(commandName.toLowerCase()),
    );

    if (matches.length === 1) {
      setInputState(matches[0] === "open" ? "open " : matches[0]);
      setHistoryIndex(null);
    }
  }, [input]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Tab") {
        event.preventDefault();
        completeInput();
        return;
      }

      if (event.key === "ArrowUp") {
        if (!commandHistory.length) {
          return;
        }

        event.preventDefault();
        const nextIndex =
          historyIndex === null
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);

        if (historyIndex === null) {
          draftInput.current = input;
        }

        setHistoryIndex(nextIndex);
        setInputState(commandHistory[nextIndex]);
        return;
      }

      if (event.key === "ArrowDown" && historyIndex !== null) {
        event.preventDefault();

        if (historyIndex < commandHistory.length - 1) {
          const nextIndex = historyIndex + 1;
          setHistoryIndex(nextIndex);
          setInputState(commandHistory[nextIndex]);
          return;
        }

        setHistoryIndex(null);
        setInputState(draftInput.current);
      }
    },
    [commandHistory, completeInput, historyIndex, input],
  );

  return { entries, input, setInput, submit, handleKeyDown };
}

export default useTerminalSession;
