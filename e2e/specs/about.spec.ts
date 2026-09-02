import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test('should render profile, CV download, and skills filter', async ({ page }) => {
    await page.goto('/about');

    // Wait for content or loading indicator to resolve
    const profileImg = page.locator('img[alt="Daniel Colmenares"]');
    await expect(profileImg).toBeVisible();

    const cvButton = page.locator('a:has-text("Download my CV")');
    await expect(cvButton).toBeVisible();
    await expect(cvButton).toHaveAttribute('href', '/daniel-colmenares-cv.pdf');

    const skillsSection = page.locator('section:has-text("Skills")');
    await expect(skillsSection.first()).toBeVisible();

    // Verify filter buttons exist
    const filterButtons = skillsSection.locator('button');
    expect(await filterButtons.count()).toBeGreaterThan(0);
  });
});
