import { test, expect } from '@playwright/test';

test.describe('Portfolio Page', () => {
  test('should render projects list and filter options in Spanish by default', async ({ page }) => {
    await page.goto('/portfolio');

    const heading = page.locator('h2:has-text("Proyectos")');
    await expect(heading).toBeVisible();

    const filterButtons = page.locator('header button');
    expect(await filterButtons.count()).toBeGreaterThan(0);
  });

  test('should render projects list in English on /en/portfolio', async ({ page }) => {
    await page.goto('/en/portfolio');

    const heading = page.locator('h2:has-text("Projects")');
    await expect(heading).toBeVisible();
  });
});
