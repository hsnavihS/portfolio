# Shivansh Shukla — Portfolio

A terminal-inspired portfolio built with React, TypeScript, and Vite.

## Commands

- `npm run generate:content` rebuilds structured content from `resume.pdf`.
- `npm run dev` regenerates content and starts the local development server.
- `npm run check` runs linting, the production build, and formatting checks.
- `npm run preview` serves the production build locally.

## Resume content

The build-time generator writes:

- `src/generated/resume.txt` for inspecting the normalized PDF extraction.
- `src/generated/portfolio.json` for the structured portfolio data.
- `public/resume.pdf` for the deployed download asset.

These files are local build artifacts and are not committed. They are recreated
by `npm run generate:content`, `npm run dev`, and `npm run build`.

Display copy, project technologies, and contact visibility are configured in
`src/content/portfolio-overrides.json`. Phone visibility is disabled by default.

## GitHub Pages base path

Vite uses the repository name from `GITHUB_REPOSITORY` during GitHub Actions builds.
Set `VITE_BASE_PATH` to override it, including `/` for a custom domain.
