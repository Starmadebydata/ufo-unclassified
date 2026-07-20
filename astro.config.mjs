// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

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
      // Exclude bulk DOD/DVIDS asset pages (noindexed in documents/[slug].astro —
      // keep this URL pattern in sync with isThinDocument() in src/data/seo.ts).
      filter: (page) => !/\/documents\/[^/]*-dod-\d{6,}/.test(page),
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