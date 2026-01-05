import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://olivierh.dev',
  integrations: [preact(), sitemap()],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  }
});
