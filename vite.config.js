/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: "https://center.beer/api/v2/",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
      '/authApi': {
        target: "https://center.beer/authApi/",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/authApi/, ''),
        secure: false,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        '/image-proxy': {
          target: '',
          changeOrigin: true,
          router: req => {
            const url = new URL(req.url, `http://${req.headers.host}`);
            return url.searchParams.get('url');
          },
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      }
    }
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.js']
      }
    }]
  }
});