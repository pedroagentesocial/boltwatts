import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

/** @type {import('astro').AstroUserConfig} */
export default {
  site: "https://www.boltwatts.com",
  output: "static",
  integrations: [react(), tailwind(), sitemap()],
  prefetch: true,
};
