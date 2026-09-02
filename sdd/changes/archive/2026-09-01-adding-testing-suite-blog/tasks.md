# Tasks: Adding Testing Suite to Blog

## Review Workload Forecast
Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Medium

---

## Task Breakdown

### Phase 1: Test Infrastructure & Tooling
- [x] 1.1 Add testing dependencies (`vitest`, `@nuxt/test-utils`, `@vue/test-utils`, `happy-dom`, `@vitest/coverage-v8`, `@playwright/test`) to `blog/package.json`.
- [x] 1.2 Add npm scripts (`test`, `test:watch`, `test:coverage`, `test:e2e`, `test:e2e:ui`) to `blog/package.json`.
- [x] 1.3 Create `blog/vitest.config.ts` using `defineVitestConfig` with `happy-dom`, Nuxt environment, and 80% coverage thresholds across lines, functions, branches, and statements.
- [x] 1.4 Create `blog/playwright.config.ts` with multi-project matrix (`Desktop Chrome`, `Mobile Chrome` - Pixel 7), base URL configuration (`http://blog.localhost:1355` / `PLAYWRIGHT_TEST_BASE_URL`), and local preview webServer settings.

### Phase 2: Unit Tests for Composables, Handlers, Adapters & Stores
- [x] 2.1 Create `blog/tests/unit/composables/useApiBase.spec.ts` testing default base URL fallback and runtime configuration overrides.
- [x] 2.2 Create `blog/tests/unit/utils/fetch-handlers.spec.ts` testing Notion API response parsing, null-safety, and error handling.
- [x] 2.3 Create `blog/tests/unit/adapters/blockContentAdapter.spec.ts` testing block transformation logic for rich text, code blocks, lists, and images.
- [x] 2.4 Create `blog/tests/unit/adapters/blogAdapter.spec.ts` testing post metadata, tags, dates, slug extraction, and excerpt mapping.
- [x] 2.5 Create `blog/tests/unit/adapters/linkAdapter.spec.ts` testing internal vs external URL resolution and social link formatting.
- [x] 2.6 Create `blog/tests/unit/stores/useUIStore.spec.ts` testing Pinia store state initialization, mobile menu toggling, and theme state mutations.

### Phase 3: Component Unit & Mount Tests
- [x] 3.1 Create `blog/tests/unit/components/Markdown.spec.ts` verifying markdown parsing, sanitization, and code syntax highlighting.
- [x] 3.2 Create `blog/tests/unit/components/Cards.spec.ts` testing `ArticleCard.vue` and `PortfolioCard.vue` props rendering, tag display, and link targets.
- [x] 3.3 Create `blog/tests/unit/components/Navigation.spec.ts` testing `Navbar.vue`, `SideNav.vue`, and `Footer.vue` active link state, responsiveness, and close triggers.
- [x] 3.4 Create `blog/tests/unit/components/Controls.spec.ts` testing `Button.vue`, `FilterOptions.vue`, and search/filter event emissions.
- [x] 3.5 Create `blog/tests/unit/components/HeadingsAndGrid.spec.ts` testing `Heading.vue` hierarchy/levels and `Grid.vue` column layout slot rendering.
- [x] 3.6 Create `blog/tests/unit/components/PillsAndModals.spec.ts` testing `Pill.vue` variants and `Modal.vue` open/close state transitions.
- [x] 3.7 Create `blog/tests/unit/components/LoadingAndBrand.spec.ts` testing `Loading.vue` spinner state and `Logo.vue` SVG rendering.
- [x] 3.8 Create `blog/tests/unit/error.spec.ts` testing custom `error.vue` status codes (404, 500), error message rendering, and `clearError` action trigger.

### Phase 4: Playwright E2E Test Suite
- [x] 4.1 Create `blog/e2e/specs/navigation.spec.ts` verifying cross-page navigation (Home -> Blog -> About -> Portfolio) and header/footer links.
- [x] 4.2 Create `blog/e2e/specs/home.spec.ts` verifying hero section, featured posts grid, and call-to-action interactions.
- [x] 4.3 Create `blog/e2e/specs/about.spec.ts` verifying bio details, experience sections, and external links.
- [x] 4.4 Create `blog/e2e/specs/blog.spec.ts` verifying post catalog, search filtering by keyword, tag selection, pagination, and article detail page rendering.
- [x] 4.5 Create `blog/e2e/specs/portfolio.spec.ts` verifying project showcase items, live links, and repository redirects.
- [x] 4.6 Create `blog/e2e/specs/social-share.spec.ts` verifying share buttons and modal dialog interactions.
- [x] 4.7 Create `blog/e2e/specs/error.spec.ts` verifying 404 page rendering on non-existent routes and navigation back to home.

### Phase 5: CI/CD Pipeline & Coverage Gate
- [x] 5.1 Create or update `.github/workflows/ci.yml` with automated steps:
  - Checkout repository and install dependencies with Bun caching.
  - Run typecheck (`vue-tsc --noEmit`).
  - Run Vitest unit & component test suite with coverage enforcement (`bun run test:coverage`).
  - Install Playwright browsers and run E2E test suite (`bun run test:e2e`).
  - Upload test results and coverage reports as CI artifacts on failure.

### Phase 6: Verification & Quality Assurance
- [x] 6.1 Execute `bun run test:coverage` and verify >= 80% coverage across all thresholds (lines, statements, branches, functions).
- [x] 6.2 Execute `bun run test:e2e` and verify all tests pass on Desktop Chrome and Mobile Chrome (Pixel 7).
- [x] 6.3 Execute `bun run check:types` / `vue-tsc --noEmit` and ensure clean type checking without test-related TypeScript errors.
