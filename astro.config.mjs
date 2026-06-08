import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://mytopaigirlfriend.com',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
  },
});
