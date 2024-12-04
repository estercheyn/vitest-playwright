import path from 'node:path';

export default {
  provider: 'v8',

  name: 'My Vitest Coverage Report',

  reports: ['v8', 'json', 'raw'],
  lcov: true,
  outputDir: 'coverage/vitest',
  sourcePath: (filePath) => {
    return `${path.join(process.cwd(), filePath)}`;
  },
  onEnd: (results) => {
    console.log(`coverage report generated: ${results.reportPath}`);
  },
};
