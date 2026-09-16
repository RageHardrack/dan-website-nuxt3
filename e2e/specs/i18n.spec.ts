import { test, expect } from '@playwright/test';

test.describe('Internationalization (i18n) Flows', () => {
  test('should render default Spanish copy on root and switch to English via LangSwitcher', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 1. Spanish default assertions on root '/'
    const homeH2 = page.locator('main h2');
    await expect(homeH2).toContainText('Esta página está en construcción...');

    const navbarAboutLink = page.locator('header nav a[href="/about"]');
    await expect(navbarAboutLink).toContainText('Acerca de mí');

    const navbarPortfolioLink = page.locator('header nav a[href="/portfolio"]');
    await expect(navbarPortfolioLink).toContainText('Portafolio');

    // 2. Click LangSwitcher 'en' button
    const langSwitchEn = page
      .locator('a[aria-label="Switch to English"]')
      .filter({ visible: true });
    await expect(langSwitchEn.first()).toBeVisible();
    await langSwitchEn.first().click();

    // 3. Verify redirected to '/en'
    await expect(page).toHaveURL(/\/en$/);

    // 4. Verify English localized strings
    await expect(homeH2).toContainText('This page is under Construction...');

    if (isMobile) {
      const menuButton = page.locator('button[aria-label="Abrir menú"]');
      await menuButton.click();
      const sideNavAbout = page.locator('aside a[href="/en/about"]');
      await expect(sideNavAbout).toContainText('About');
      const closeBtn = page.locator(
        'aside button[aria-label="Close menu"], aside button[aria-label="Cerrar menú"]',
      );
      await closeBtn.click();
    } else {
      const navbarAboutLinkEn = page.locator('header nav a[href="/en/about"]');
      await expect(navbarAboutLinkEn).toContainText('About');

      const navbarPortfolioLinkEn = page.locator('header nav a[href="/en/portfolio"]');
      await expect(navbarPortfolioLinkEn).toContainText('Portfolio');
    }

    // 5. Switch back to Spanish via LangSwitcher 'es' button
    const langSwitchEs = page
      .locator('a[aria-label="Switch to Español"]')
      .filter({ visible: true });
    await expect(langSwitchEs.first()).toBeVisible();
    await langSwitchEs.first().click();

    await expect(page).toHaveURL(/\/$/);
    await expect(homeH2).toContainText('Esta página está en construcción...');
  });

  test('should support language switching in mobile side nav', async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, 'This test is mobile-specific');

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Open mobile menu
    const menuButton = page.locator('button[aria-label="Abrir menú"]');
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    const aside = page.locator('aside');
    await expect(aside).toBeVisible();

    // In side nav, click English switcher
    const mobileSwitchEn = aside.locator('a[aria-label="Switch to English"]');
    await expect(mobileSwitchEn).toBeVisible();
    await mobileSwitchEn.click();

    await expect(page).toHaveURL(/\/en$/);

    // Re-open side nav and check English labels
    await menuButton.click();
    await expect(aside).toBeVisible();
    const sideNavAbout = aside.locator('a[href="/en/about"]');
    await expect(sideNavAbout).toContainText('About');
  });

  test('should navigate to /en/portfolio and display English portfolio header', async ({
    page,
  }) => {
    await page.goto('/en/portfolio');

    const heading = page.locator('h2:has-text("Projects")');
    await expect(heading).toBeVisible();

    const switchEs = page
      .locator('a[aria-label="Switch to Español"]')
      .filter({ visible: true });
    await expect(switchEs.first()).toBeVisible();
    await switchEs.first().click();

    await expect(page).toHaveURL(/\/portfolio$/);
    const headingEs = page.locator('h2:has-text("Proyectos")');
    await expect(headingEs).toBeVisible();
  });
});
