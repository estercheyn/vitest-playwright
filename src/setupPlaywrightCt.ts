import path from 'node:path';

import { test as ctBase } from '@playwright/experimental-ct-react';
import MCR from 'monocart-coverage-reports';

type TPlaywrightCtFixtures = {
  autoTestFixture: string;
};

export const test = ctBase.extend<TPlaywrightCtFixtures>({
  autoTestFixture: [
    async ({ page }, use) => {
      // coverage API is chromium only
      if (test.info().project.name === 'chromium') {
        await Promise.all([
          page.coverage.startJSCoverage({
            resetOnNavigation: false,
          }),
          page.coverage.startCSSCoverage({
            resetOnNavigation: false,
          }),
        ]);
      }

      await use('autoTestFixture');

      /** stop collecting coverage */
      if (test.info().project.name === 'chromium') {
        const [jsCoverage, cssCoverage] = await Promise.all([
          page.coverage.stopJSCoverage(),
          page.coverage.stopCSSCoverage(),
        ]);
        const coverageList = [...jsCoverage, ...cssCoverage];

        /** Coverage options configuration */
        const coverageReport = MCR({
          name: 'Playwright-ct coverage report',
          logging: 'debug',
          outputDir: './coverage/playwright-ct/',
          sourceFilter: {
            '**/src/**': true,
            '**/.storybook/**': false,
            '**/node_modules/**': false,
          },
          sourcePath: (filePath) => {
            return `${path.join(process.cwd(), filePath)}`;
          },
          reports: ['v8', 'json', 'raw'],
          provider: 'v8',
        });
        await coverageReport.add(coverageList);
        // await coverageReport.generate();
      }
    },
    {
      scope: 'test',
      auto: true,
    },
  ],
});

export { expect } from '@playwright/experimental-ct-react';
