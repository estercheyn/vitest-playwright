// https://github.com/cenfun/monocart-coverage-reports
import path from 'node:path';

const coverageOptions = {
  name: 'Playwright-ct coverage report',
  logging: 'debug',
  outputDir: './coverage/playwright-ct/',
  entryFilter: {
    '**/src/**': true,
  },
  sourceFilter: {
    '**/src/**': true,
    '**/node_modules/**': false,
  },
  sourcePath: (filePath) => {
    return `${path.join(process.cwd(), filePath)}`;
  },
  reports: ['v8', 'json', 'raw'],
  provider: 'v8',
};

export default coverageOptions;
