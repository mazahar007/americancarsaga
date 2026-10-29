// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { SITE_URL, HOST } from './src/config.ts';

// Site address: set SITE_URL on your host, or edit SITE.url in src/config.ts.
// On Vercel the *.vercel.app address is picked up automatically.
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({ filter: (page) => !page.includes('/admin') }),
    {
      // Vercel can't run PHP: drop the PHP endpoints and Apache settings from its build
      // (the Vercel functions in /api take their place).
      name: 'acs-host-cleanup',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          if (HOST !== 'vercel') return;
          const out = fileURLToPath(dir);
          await rm(out + 'api', { recursive: true, force: true });
          await rm(out + '.htaccess', { force: true });
        },
      },
    },
  ],
  build: { inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});
