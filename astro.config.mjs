import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

const isGithubPages = process.env.GITHUB_ACTIONS === "true";

/** @type {import('astro').AstroUserConfig} */
export default {
  site: isGithubPages ? "https://pedroagentesocial.github.io" : "https://www.boltwatts.com",
  base: isGithubPages ? "/boltwatts" : "/",
  output: "static",
  integrations: [react(), tailwind(), sitemap()],
  prefetch: true,
};
