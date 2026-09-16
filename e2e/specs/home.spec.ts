import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should render hero section and brand elements in Spanish by default', async ({ page }) => {
    await page.goto('/');

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Daniel Colmenares');

    const subHeading = page.locator('main h2');
    await expect(subHeading).toContainText(
      'Esta página está en construcción...',
    );

    const logo = page.locator('img[alt="Dragón Azul Logo"]');
    await expect(logo.first()).toBeVisible();

    const githubLink = page.locator('a[href*="github.com"]');
    await expect(githubLink.first()).toBeVisible();
  });

  test('should render hero section in English on /en route', async ({ page }) => {
    await page.goto('/en');

    const subHeading = page.locator('main h2');
    await expect(subHeading).toContainText(
      'This page is under Construction...',
    );
  });
});
