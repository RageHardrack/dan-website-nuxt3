# Proposal: Adding Comprehensive Testing Suite to Blog

## Intent
Establish a robust, automated quality gate for `blog` by introducing unit/component testing via Vitest and end-to-end (E2E) testing via Playwright, backed by CI automation, to eliminate regressions and guarantee >=80% test coverage.

## Scope

### In-Scope
- **Unit & Component Testing**: Configure Vitest (`@nuxt/test-utils`, `@vue/test-utils`, `happy-dom`, `@vitest/coverage-v8`) with strict >=80% coverage thresholds across lines, statements, functions, and branches.
- **Coverage Surface**: Tests under `blog/tests/unit/` for composables (`useBlogMetadata`, `usePagination`, `useReadingTime`), adapters, stores, utils, Markdown renderers, UI cards, navigation, controls, and `error.vue`.
- **E2E Testing**: Configure Playwright (`blog/playwright.config.ts`, `blog/e2e/specs/`) covering critical user journeys (catalog navigation, search/tag filtering, article rendering, theme switching, error routing) across Desktop Chrome and Mobile Pixel 7.
- **CI Automation**: GitHub Actions workflow (`.github/workflows/ci.yml`) executing typecheck, Vitest coverage check, and Playwright E2E matrix.
- **Mocking & Tooling**: Establish MSW or Nuxt test utils handlers for content/assets and add scripts to `package.json`.

### Out-of-Scope
- Refactoring `blog` application source logic or UI layouts.
- Performance profiling / Lighthouse benchmarking in CI.
- Visual regression screenshot baselining.

## Capabilities

### New Capabilities
- `blog-unit-testing`: Automated execution of unit and component test suites with v8 coverage enforcement.
- `blog-e2e-testing`: Cross-viewport headless browser validation of core user journeys with artifacts on failure.
- `blog-ci-quality-gate`: Monorepo CI verification blocking PRs failing typechecks, coverage limits (<80%), or E2E tests.

### Modified Capabilities
- `blog-scripts`: Extended `package.json` with `test`, `test:unit`, `test:coverage`, and `test:e2e` scripts.

## Approach
1. Install testing dependencies in `blog` without polluting other monorepo workspaces.
2. Setup `vitest.config.ts` with `@nuxt/test-utils/config` environment and 80% coverage gates.
3. Author modular unit tests organized by domain (`composables/`, `components/`, `utils/`, `pages/`).
4. Setup `playwright.config.ts` with local preview web server orchestration and multi-device matrix.
5. Author resilient Playwright specs targeting semantic role selectors and data-testids.
6. Configure `.github/workflows/ci.yml` with dependency caching and artifact capture.

## Affected Areas
- `blog/package.json` & root lockfile
- `blog/vitest.config.ts` (new)
- `blog/playwright.config.ts` (new)
- `blog/tests/` & `blog/e2e/` (new)
- `.github/workflows/ci.yml` (new / updated)

## Risks & Mitigations
- **Flaky Nuxt Content / Async Mocks**: Use `@nuxt/test-utils/runtime` helpers and isolated mock factories.
- **Slow CI Runtimes**: Utilize Playwright local server reuse, dependency caching, and parallel Vitest threads.

## Rollback Plan
Revert commit removing test configs, `tests/`, `e2e/`, and workflow additions. No production runtime code or database state is affected.

## Success Criteria
- [ ] `pnpm --filter blog test:coverage` passes with >= 80% coverage across all metrics.
- [ ] `pnpm --filter blog test:e2e` passes on Desktop Chrome and Mobile Pixel 7.
- [ ] CI pipeline executes and passes all test suites on pull requests.
