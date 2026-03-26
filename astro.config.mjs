import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

const isGithubPages = process.env.GITHUB_ACTIONS === "true";

/** @type {import('astro').AstroUserConfig} */
export default {
  site: isGithubPages ? "https://pedroagentesocial.github.io" : "https://www.boltwatts.com",
  base: isGithubPages ? "/boltwatts" : "/",
  output: "static",
  integrations: [react(), tailwind()],
  prefetch: true,
};
