import { test, expect } from '@playwright/test';

test.describe('Error Page Handling', () => {
  test('should render 404 page for unknown routes and allow return to home', async ({ page }) => {
    await page.goto('/unknown-route-that-does-not-exist');

    const heading = page.locator('h1');
    await expect(heading).toContainText('404');

    const subHeading = page.locator('h2');
    await expect(subHeading).toContainText('Page Not Found');

    const homeButton = page.locator('button:has-text("Return to Home")');
    await expect(homeButton).toBeVisible();
    await homeButton.click();

    await expect(page).toHaveURL('/');
  });
});
