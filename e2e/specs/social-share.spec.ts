import { test, expect } from '@playwright/test';

test.describe('Social Share Page', () => {
  test('should render profile, contact email, and external links', async ({ page }) => {
    await page.goto('/social-share');

    const title = page.locator('h1');
    await expect(title).toContainText('Daniel Colmenares');

    const subtitle = page.locator('h3');
    await expect(subtitle).toContainText('Fullstack Web Developer');

    const mailLink = page.locator('a[href^="mailto:"]');
    await expect(mailLink).toBeVisible();
    await expect(mailLink).toHaveAttribute('href', 'mailto:dacolmenares93@gmail.com');
  });
});
