import { defineConfig, devices } from '@playwright/experimental-ct-react';
import tsconfigPath from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import path from 'node:path';

function buildViteConfig() {
  return {
    name: 'build-vite-config',
    config() {
      return {
        build: {
          sourcemap: true,
          minify: false,
        },
      };
    },
  };
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* dir to find all tests. */
  testDir: 'src',
  /* inform playwright to consider .spec files as test to run. */
  testMatch: '**/*.spec.tsx',
  /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
  snapshotDir: './__snapshots__',
  /* Maximum time one test can run for. Default is 30 sec. Here we changed it to 20 sec. */
  timeout: 20 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters .  */
  reporter: [['list']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  globalTeardown: './global-teardown.config.js',
  globalSetup: './global-setup.config.js',

  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Port to use for Playwright component endpoint. */
    ctPort: 3100,

    /* playwright is using vite to bundle component and render. So need to add vite plugin that we use in vite for example: graphql */
    /* https://playwright.dev/docs/test-components#i-have-a-project-that-already-uses-vite-can-i-reuse-the-config */
    ctViteConfig: {
      plugins: [buildViteConfig(), tsconfigPath(), react()],
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
