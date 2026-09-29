import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" lets the site work from https://USERNAME.github.io/REPO-NAME/
export default defineConfig({
  plugins: [react()],
  base: "./",
});
