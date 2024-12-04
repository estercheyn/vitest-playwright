import MCR from 'monocart-coverage-reports';
import coverageOptions from './mcr.config.integration';

async function globalSetup(config) {
  const mcr = MCR(coverageOptions);
  await mcr.cleanCache();
}

export default globalSetup;
