# Tasks: blog-nuxt4-upgrade

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~200 lines (excluding lockfile & renames) |
| 400-line budget risk | Medium |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Medium

### Suggested Work Units
| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1    | Directory structure migration | PR 1 | Git tracks as renames |
| 2    | Configuration updates & lockfile migration | PR 1 | Package upgrades and Bun lockfile |
| 3    | Verification and Build | PR 1 | Typecheck, Dev tests, and Docker build |

## Phase 1: Directory Restructuring
- [x] 1.1 Create the target directory `blog/app/`.
- [x] 1.2 Move all frontend directories to `blog/app/`: `components/`, `pages/`, `layouts/`, `assets/`, `utils/`, `stores/`, `interfaces/`, `adapters/`, `vendors/`.
- [x] 1.3 Move frontend root files to `blog/app/`: `app.vue`, `app.config.ts`, `constantes.ts`.

## Phase 2: Configuration & Dependency Updates
- [x] 2.1 Delete legacy `blog/pnpm-lock.yaml`.
- [x] 2.2 Update `blog/package.json` dependencies: upgrade `nuxt` to `^4.0.0` and `@pinia/nuxt` to compatibility versions, and replace legacy `nuxt-icon` with `@nuxt/icon`.
- [x] 2.3 Update `blog/nuxt.config.ts` to include `future: { compatibilityVersion: 4 }`, update `@nuxt/icon` registration, and scan stores inside `./app/stores/**`.
- [x] 2.4 Update `blog/app/app.config.ts` by renaming the configuration key from `nuxtIcon` to `icon`.
- [x] 2.5 Update `blog/tailwind.config.js` `content` array to scan directories inside `./app/` instead of the root.
- [x] 2.6 Update `blog/Dockerfile` to utilize Alpine Bun base image layers (`oven/bun:1-alpine`) and Bun CLI scripts.

## Phase 3: Dependency Resolution & Verification
- [x] 3.1 Run `bun install` inside `blog/` to generate `bun.lock`.
- [x] 3.2 Execute `bun run typecheck` or `npx nuxi typecheck` to verify pathing and TypeScript compile checks.
- [x] 3.3 Address any compiler or path mapping issues arising from standard alias resolution in the new `app/` folder.

## Phase 4: Local Smoke Test & Container Build
- [x] 4.1 Run `bun run build` to verify local production bundle builds.
- [x] 4.2 Run `bun run dev` to verify local hydration and component rendering (specifically icons and tailwind styles).
- [x] 4.3 Execute `docker compose build` (or equivalent docker build) to ensure compilation in Alpine Bun containers succeeds.
