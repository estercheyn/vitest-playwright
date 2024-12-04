import App from './App';
import { expect, test } from './setupPlaywrightCt';

test('count', async ({ page, mount }) => {
  await mount(<App />);

  let countMessage = await page.getByLabel('count').innerText();
  await expect(countMessage).toBe('count is 0');

  await page.getByLabel('button').click();

  countMessage = await page.getByLabel('count').innerText();
  await expect(countMessage).toBe('count is 1');
});
