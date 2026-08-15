// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { documents } from './src/data/documents';
import { cultureRecords } from './src/data/culture';
import { isThinDocument, isThinCulture } from './src/data/seo';

// Thin pages are noindexed in their page templates; excluding them from the
// sitemap here keeps both decisions driven by the same functions.
const thinPaths = new Set([
  ...documents.filter(isThinDocument).map(doc => `/documents/${doc.slug}/`),
  ...cultureRecords.filter(isThinCulture).map(item => `/culture/${item.id}/`),
]);

// https://astro.build/config
export default defineConfig({
  site: 'https://ufo-declassified.com',
  output: 'static',
  
  integrations: [
    react(),
    sitemap({
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !thinPaths.has(new URL(page).pathname),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  // Use Cloudflare adapter for deployment
  // For pure static, we can also use static output
  // adapter: cloudflare(),

  image: {
    // Use sharp for build-time image optimization
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});