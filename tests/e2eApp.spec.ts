import { test, expect } from '@playwright/test';

const LOCAL_HOST = 'http://localhost:5173/'


test.beforeEach(async ({ page }) => {
  await page.goto(LOCAL_HOST)
})

test('get started link', async ({ page }) => {
  await page.goto(LOCAL_HOST);
  const text = await page.getByRole('paragraph')
  const textContent = await text.textContent()
  await expect(textContent?.length).toBeGreaterThan(0)
});
