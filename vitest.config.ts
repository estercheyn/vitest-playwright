import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

process.env.TZ = 'UTC'; // configure UTC timezone for unit test

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    include: ['src/**/*.test.?(c|m)[jt]s?(x)'], // Exclude .spec.tsx files from test execution
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      include: ['src'],
      exclude: [
        '**/*.stories.ts?(x)',
        '**/*.spec.tsx',
        'setupTests.ts',
        '**/*.js',
        '**/setupPlaywrightCt.ts',
        '*.portable.ts',
      ],
      /*  provider: 'v8',
      reportsDirectory: 'build/coverage',
      reporter: ['json', 'raw'], */
      provider: 'custom',
      customProviderModule: 'vitest-monocart-coverage',
    },
    passWithNoTests: true,
    environment: 'jsdom',
    testTimeout: 20000,
    pool: process.env.POOL ?? 'forks', // for mutation test, use threads
    clearMocks: true, // auto clear count after each case
    fakeTimers: { shouldAdvanceTime: true }, // https://github.com/testing-library/dom-testing-library/issues/987
    environmentOptions: { jsdom: { url: 'http://localhost' } },
  },
});
