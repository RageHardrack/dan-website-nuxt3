import { test, expect } from '@playwright/test';

test.describe('Navigation Flow', () => {
  test('should render navbar and navigate between primary pages', async ({ page, isMobile }) => {
    await page.goto('/');

    if (isMobile) {
      // Open mobile menu
      const menuButton = page.locator('header nav button');
      await expect(menuButton).toBeVisible();
      await menuButton.click();

      // Click Blog link in side nav
      const blogLink = page.locator('aside a[href="/blog"]');
      await expect(blogLink).toBeVisible();
      await blogLink.click();
    } else {
      const blogLink = page.locator('header nav a[href="/blog"]');
      await expect(blogLink).toBeVisible();
      await blogLink.click();
    }

    await expect(page).toHaveURL(/\/blog/);

    // Navigate to About
    if (isMobile) {
      const menuButton = page.locator('header nav button');
      await menuButton.click();
      const aboutLink = page.locator('aside a[href="/about"]');
      await aboutLink.click();
    } else {
      const aboutLink = page.locator('header nav a[href="/about"]');
      await aboutLink.click();
    }

    await expect(page).toHaveURL(/\/about/);

    // Navigate to Portfolio
    if (isMobile) {
      const menuButton = page.locator('header nav button');
      await menuButton.click();
      const portfolioLink = page.locator('aside a[href="/portfolio"]');
      await portfolioLink.click();
    } else {
      const portfolioLink = page.locator('header nav a[href="/portfolio"]');
      await portfolioLink.click();
    }

    await expect(page).toHaveURL(/\/portfolio/);
  });

  test('should verify footer credits and social media anchors', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('Daniel Colmenares');

    const socialLinks = footer.locator('a');
    expect(await socialLinks.count()).toBeGreaterThan(0);
  });
});
