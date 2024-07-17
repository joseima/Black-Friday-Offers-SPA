import { test, expect } from '@playwright/test'

const LOCAL_HOST = 'http://localhost:5173/'

test.beforeEach(async ({ page }) => {
  await page.goto(LOCAL_HOST)
});

test.describe('app login and load promotions correctly', () => {

  test('login sign correctly and redirect to home', async ({ page }) => {

    await expect(page).toHaveURL(`${LOCAL_HOST}sign-in`)


    await page.fill('input[name="name"]', 'Admin')
    await page.fill('input[name="email"]', 'mail@web.com')
    await page.fill('input[name="password"]', '123')


    await page.click('button[type="submit"]')
    const offersButton = page.locator('text=Lets see the offers');
    await expect(offersButton).toBeVisible();

    await offersButton.click();
    await expect(page).toHaveURL(LOCAL_HOST)
  })

  test('products load correctly from API and show in home', async ({ page }) => {

    await page.fill('input[name="name"]', 'Admin')
    await page.fill('input[name="email"]', 'mail@web.com')
    await page.fill('input[name="password"]', '123')
    await page.click('button[type="submit"]')

    const productList = await page.locator('.products ul li')
    await expect(productList).toHaveCount(0)

    for (const product of await productList.all()) {
      const title = await product.locator('h3').textContent()
      const price = await product.locator('h5').textContent()

      expect(title?.length).toBeGreaterThan(0)
      expect(price?.length).toBeGreaterThan(0)
    }
  })
})
