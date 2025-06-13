import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const isGitHubPages = process.env.DEPLOY_TARGET === "GH_PAGES";

export default defineConfig({
  base: isGitHubPages ? "/integration4/" : "/",
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});