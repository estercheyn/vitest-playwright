import MCR from 'monocart-coverage-reports';
import coverageOptions from './mcr.config.integration.js';

async function globalTeardown(config) {
  const mcr = MCR(coverageOptions);
  await mcr.generate();
}

export default globalTeardown;
