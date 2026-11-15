import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

const [repositoryOwner, repositoryName] =
  process.env.GITHUB_REPOSITORY?.split("/") ?? [];
const configuredBase = process.env.VITE_BASE_PATH?.trim();
const isUserSite =
  repositoryOwner &&
  repositoryName?.toLowerCase() ===
    `${repositoryOwner.toLowerCase()}.github.io`;
const pagesBase = repositoryName
  ? isUserSite
    ? "/"
    : `/${repositoryName}/`
  : "/";
const base = configuredBase || pagesBase;

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
