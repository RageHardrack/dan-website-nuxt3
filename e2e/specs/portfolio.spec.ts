import { test, expect } from '@playwright/test';

test.describe('Portfolio Page', () => {
  test('should render projects list and filter options', async ({ page }) => {
    await page.goto('/portfolio');

    const heading = page.locator('h2:has-text("Projects")');
    await expect(heading).toBeVisible();

    const filterButtons = page.locator('header button');
    expect(await filterButtons.count()).toBeGreaterThan(0);
  });
});
