const commands = ["help", "experience", "projects", "skills", "resume"];

function TerminalPreview() {
  return (
    <section className="terminal-preview" aria-label="Terminal layout preview">
      <header className="terminal-titlebar">
        <span>shivansh@portfolio: ~</span>
        <span className="terminal-status">visual shell</span>
      </header>

      <div className="terminal-body">
        <div className="terminal-copy">
          <p className="terminal-command">$ whoami</p>
          <h1>Hi, I&apos;m Shivansh Shukla.</h1>
          <p>
            I&apos;m a software engineer focused on backend platforms,
            AI-powered systems, programming languages, and reliable products.
          </p>

          <p className="terminal-command">$ help</p>
          <div className="command-list">
            {commands.map((command) => (
              <span key={command}>{command}</span>
            ))}
          </div>

          <p className="terminal-prompt" aria-hidden="true">
            $ <span className="cursor" />
          </p>
        </div>

        <aside className="status-panel">
          <span>currently</span>
          <strong>microsoft</strong>
          <span>focus</span>
          <strong>backend / AI / systems</strong>
          <span>checkpoint</span>
          <strong>visual shell</strong>
        </aside>
      </div>
    </section>
  );
}

export default TerminalPreview;
