# Tasks: Fix Production 500 Errors and Data Contracts in Blog

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: stacked-to-main
400-line budget risk: Low

## Review Workload Forecast
- **Estimated Total Diff**: ~120 lines (+85 / -35) across 10 files
- **Risk Level**: Low (Targeted SSR routing fix, defensive component fallbacks, and error boundary)
- **PR Strategy**: Single PR targeting `main`

---

## Phase 1: Environment & Runtime Configuration

- [x] 1.1 Update `docker-compose.yml` with dual runtime environment variables for the `blog` service:
  - Add `NUXT_API_BASE_URL=http://guilliman:3000/api/v1` (SSR internal docker DNS).
  - Add `NUXT_PUBLIC_API_BASE_URL=https://${API_DOMINIO}/api/v1` (Client public gateway).
- [x] 1.2 Update `blog/nuxt.config.ts` to configure `runtimeConfig`:
  - Define private `apiBaseUrl: process.env.NUXT_API_BASE_URL || 'http://localhost:3000/api/v1'`.
  - Define `public.apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1'`.
- [x] 1.3 Create `blog/app/composables/useApiBase.ts`:
  - Implement `useApiBase(): string` resolving `import.meta.server ? (config.apiBaseUrl || config.public.apiBaseUrl) : config.public.apiBaseUrl`.

## Phase 2: API Handlers & Type Contracts

- [x] 2.1 Update `blog/app/utils/fetch-handlers.ts`:
  - Refactor `fetchAboutPage` to return `{ about: ContentBlock[], skills: ISkill[], experiences: IExperience[] }`.
  - Add `fetchLinksPage` querying `${baseUrl}/links` and returning `ILink[]`.
  - Ensure endpoints use `useApiBase()` for dynamic base URL resolution.
- [x] 2.2 Verify and refine type declarations (`ContentBlock.ts`, `ILink.ts`):
  - Ensure `ContentBlock` correctly types block text, order, and styling.
  - Ensure `ILink` interface aligns with Guilliman's `/links` payload.

## Phase 3: Component Fixes & Defensive UI

- [x] 3.1 Harden `blog/app/components/Markdown/index.vue`:
  - Add default prop value for `content: () => []`.
  - Add defensive checks (`Array.isArray(props.content)`) to prevent iteration over undefined blocks.
- [x] 3.2 Update `blog/app/pages/About/index.vue`:
  - Pass `data?.about || []` to `<Markdown :content="..." />`.
  - Replace non-null assertion operators (`!`) with optional chaining and computed default fallbacks on `skills` and `experiences`.
- [x] 3.3 Update `blog/app/pages/Social-Share/index.vue`:
  - Update data fetch to use `fetchLinksPage` / `useApiBase()`.
  - Safely render links array with `v-for="link in (links || [])"`.
- [x] 3.4 Audit and harden `blog/app/pages/Blog/index.vue` and `blog/app/pages/Portfolio/index.vue`:
  - Guard `posts[0]` and `posts.slice(1)` in Blog page against empty post lists.
  - Guard `filteredProjects` in Portfolio page against null/undefined `data.value`.

## Phase 4: Error Boundary & Fallbacks

- [x] 4.1 Create `blog/app/error.vue`:
  - Define root error boundary catching HTTP 404, 500, and unhandled client exceptions.
  - Include recovery CTA calling `clearError({ redirect: '/' })`.

## Phase 5: Verification & Quality Assurance

- [x] 5.1 Run type-check with `bun run check` (or `vue-tsc --noEmit`) in `blog/` to ensure zero typing errors.
- [x] 5.2 Run production build with `bun run build` in `blog/` to ensure bundle compiles without SSR / nitro errors.
- [x] 5.3 Validate SSR data fetching and error page handling under local/simulated environment.
