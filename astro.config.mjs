import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://mytopaigirlfriend.com',
  output: "hybrid",

  markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
  },

  adapter: cloudflare()
});