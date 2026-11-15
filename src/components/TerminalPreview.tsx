import { useLayoutEffect, useRef, type FormEvent } from "react";
import { terminalCommands } from "@/content/commands";
import type { TerminalSession } from "@/hooks/useTerminalSession";

interface TerminalPreviewProps {
  session: TerminalSession;
}

function WhoAmIOutput() {
  return (
    <div className="whoami-layout">
      <div className="whoami-output">
        <h1>Hi, I&apos;m Shivansh Shukla.</h1>
        <p>
          I&apos;m a software engineer focused on backend platforms, AI-powered
          systems, programming languages, and reliable products.
        </p>
        <p className="terminal-hint">
          type <code>help</code> to view available commands.
        </p>
      </div>

      <aside className="status-panel">
        <div>
          <span>currently</span>
          <strong>microsoft</strong>
        </div>
        <div>
          <span>focus</span>
          <strong>backend / AI / systems</strong>
        </div>
        <div>
          <span>terminal</span>
          <strong>interactive</strong>
        </div>
      </aside>
    </div>
  );
}

function HelpOutput() {
  return (
    <div className="help-output">
      {terminalCommands.map((command) => (
        <div className="help-row" key={command.name}>
          <code>{command.usage}</code>
          <span>{command.description}</span>
        </div>
      ))}
    </div>
  );
}

function TerminalPreview({ session }: TerminalPreviewProps) {
  const terminalBody = useRef<HTMLDivElement>(null);
  const terminalInput = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    const body = terminalBody.current;
    if (body) {
      body.scrollTop = body.scrollHeight;
    }

    if (window.matchMedia("(min-width: 769px)").matches) {
      terminalInput.current?.focus();
    }
  }, [session.entries.length]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    session.submit();
  };

  return (
    <section className="terminal-preview" aria-label="Interactive terminal">
      <header className="terminal-titlebar">
        <span>shivansh@portfolio: ~</span>
        <span className="terminal-status">interactive</span>
      </header>

      <div className="terminal-body" ref={terminalBody}>
        <div
          className="terminal-copy"
          onClick={() => terminalInput.current?.focus()}
        >
          <p className="terminal-command">$ whoami</p>
          <WhoAmIOutput />

          <div className="terminal-history" aria-live="polite">
            {session.entries.map((entry) => (
              <div className="terminal-entry" key={entry.id}>
                <p className="terminal-command">$ {entry.command}</p>
                {entry.output === "whoami" ? (
                  <WhoAmIOutput />
                ) : entry.output === "help" ? (
                  <HelpOutput />
                ) : (
                  <div
                    className={`terminal-output${
                      entry.tone === "error" ? " is-error" : ""
                    }`}
                  >
                    {entry.lines.map((line, index) => (
                      <p key={`${entry.id}-${index}`}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <form className="terminal-form" onSubmit={handleSubmit}>
            <label htmlFor="terminal-input">$</label>
            <span className="terminal-input-value">
              <input
                autoCapitalize="none"
                autoComplete="off"
                id="terminal-input"
                onChange={(event) => session.setInput(event.target.value)}
                onKeyDown={session.handleKeyDown}
                ref={terminalInput}
                spellCheck={false}
                style={{ width: `${session.input.length}ch` }}
                value={session.input}
              />
              <span className="terminal-cursor" aria-hidden="true" />
            </span>
          </form>
        </div>
      </div>
    </section>
  );
}

export default TerminalPreview;
