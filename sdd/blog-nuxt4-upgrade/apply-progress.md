# Apply Progress: blog-nuxt4-upgrade

All phases of the Nuxt 4 upgrade have been successfully implemented and verified.

## Accomplished Work

### Phase 1: Directory Restructuring
- Git-moved the following folders and files under `./app/`:
  - `components/`
  - `pages/`
  - `layouts/`
  - `assets/`
  - `utils/`
  - `stores/`
  - `interfaces/`
  - `adapters/`
  - `vendors/`
  - `app.vue`
  - `app.config.ts`
  - `constantes.ts`
- Kept the backend Nitro `server/` directory and static `public/` directory at the project root.

### Phase 2: Configuration & Dependency Updates
- **Package Manager Migration**: Swapped `pnpm` for `bun`. Deleted `pnpm-lock.yaml`.
- **Dependencies**: Upgraded Nuxt to `^4.0.0` (resolves to `4.4.8`), upgraded `@pinia/nuxt` to `^0.9.0`, swapped `nuxt-icon` with `@nuxt/icon@^1.10.0`, and upgraded `@nuxtjs/tailwindcss` to `^6.14.0` for Nuxt 4 compatibility. Added `typescript` and `vue-tsc` as devDependencies.
- **`nuxt.config.ts`**: Enabled Nuxt 4 behavior with `future: { compatibilityVersion: 4 }`, updated Pinia store directories scanning to `./app/stores/**`, and registered `@nuxt/icon`.
- **`app.config.ts`**: Renamed configuration key from `nuxtIcon` to `icon`.
- **`tailwind.config.js`**: Prefixed content scanning directories with `./app/` to match the new location.
- **`Dockerfile`**: Fully converted the Docker container configuration to use `oven/bun:1-alpine` and Bun runner.

### Phase 3 & 4: Dependency Resolution & Verification
- Generated `bun.lock` via `bun install` inside `./blog`.
- Resolved pathing issues: Changed root-level `~~/` alias paths to `~/` for all migrated files in `app/`, and changed to `~~/app/` in backend `server/` files since `~` now targets the application `app/` folder.
- Resolved TypeScript typing errors:
  - Imported `TechTag` as a type-only import in `Pill/Tech.vue`.
  - Added safe navigation and fallback defaults to Notion properties like `Stage` and `UTILS_LINKS[0]`.
  - Typed child database mapper variables in `PortfolioServices.ts` using `.filter` and `.map` to avoid indexing issues.
  - Aligned return type of `BlogService.getPostContent` with `ContentBlock[]` to resolve serialization mismatches.
- Verified TypeScript compilation: `npx nuxi typecheck` returns **0 errors**.
- Verified production build: `bun run build` completed successfully.

### Phase 4: Local Smoke Test & Verification
- **Resolved library compile mismatch**: Executed `bunx vue-transitions-version-switch 3` to manually force `@morev/vue-transitions` to target Vue 3 builds, resolving a Vue 2 rendering error (`Cannot read properties of undefined (reading '_c')`).
- **Resolved serialization warning/error**: Installed `pinia@^3.0.4` as a direct dependency of the project to resolve SSR payload hydration crashes related to `hasOwnProperty` checks on state.
- **Improved local icons rendering**: Added `@iconify-json/mdi` and `@iconify-json/fa` to `devDependencies` to bundle core icon sets locally and eliminate runtime fetch warnings.
- **Verified local dev rendering**: Navigated to the homepage `http://localhost:3000/` using the browser. Confirmed the site hydrates successfully with Tailwind CSS layouts, and renders icons cleanly with 0 console warnings or errors.
- **Verified Docker container build**: Executed `docker compose build nuxt-app` and successfully compiled the app inside Alpine Bun containers, producing a `dragon-azul-nuxt3-website` image. Resolved a build failure in the `prod-deps` stage by adding the `--ignore-scripts` flag to prevent the `nuxt prepare` postinstall hook from running without Nuxt installed.

