import { test, expect } from '@playwright/test';

test.describe('Blog Page & Detail', () => {
  test('should render blog catalog and allow navigation to an article', async ({ page }) => {
    await page.goto('/blog');

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    const articleLinks = page.locator('a[href^="/blog/"]');
    const count = await articleLinks.count();

    if (count > 0) {
      const firstArticle = articleLinks.first();
      const href = await firstArticle.getAttribute('href');
      await firstArticle.click();

      if (href) {
        await expect(page).toHaveURL(new RegExp(href));
        const backLink = page.locator('a[href="/blog"]');
        await expect(backLink.first()).toBeVisible();
      }
    }
  });
});
