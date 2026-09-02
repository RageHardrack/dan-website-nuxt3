# Proposal: Fix Production 500 Errors and Data Contracts in Blog

## Intent
Resolve production 500 crashes and hydration/rendering errors across the Nuxt 4 `blog` application caused by SSR hairpin NAT network failures, missing runtime config integration, data shape mismatches with Guilliman backend, and unprotected component rendering.

## Scope
- **In Scope**:
  - Configure dual runtime configuration in `nuxt.config.ts` (`apiBaseUrl` for SSR internal docker network and `public.apiBaseUrl` for browser requests).
  - Inject environment variables `NUXT_API_BASE_URL` and `NUXT_PUBLIC_API_BASE_URL` into Docker Compose.
  - Create unified `useApiBase()` composable for SSR/client URL resolution.
  - Fix `About/index.vue` and `Markdown/index.vue` to match backend payload (`ContentBlock[]`).
  - Fix `Social-Share/index.vue` endpoint path (`${baseUrl}/links`) and array structure.
  - Implement defensive guards on optional chaining/destructuring across composables and components.
  - Add root error boundary page `app/error.vue`.
- **Out of Scope**:
  - Modifying Guilliman Go backend endpoints or database schemas.
  - Redesigning UI layout or altering aesthetic components.

## Capabilities
- **Dual-Environment API Resolution**: Nuxt SSR communicates directly via Docker service discovery (`http://guilliman:3000/api/v1`), eliminating hairpin NAT failures, while client-side requests resolve via public gateway.
- **Resilient Data Binding**: Component templates gracefully handle loading, empty, and partial data blocks without throwing unhandled exceptions.
- **Graceful Error Recovery**: Application-level error page intercepts unhandled errors and allows user recovery.

## Approach
1. **Runtime Config**: Define `apiBaseUrl` (server) and `public.apiBaseUrl` in `nuxt.config.ts`. Update `docker-compose.yml` to inject internal Docker host and public domain.
2. **Unified Composable**: Implement `useApiBase()` to automatically select the appropriate base URL context (server vs client).
3. **Data Contract Alignment**: Adjust types and access patterns in `About/index.vue` (unwrap direct array response) and `Social-Share/index.vue` (query `/links` instead of `/api/links`).
4. **Defensive Error Handling**: Wrap data transformations in safe defaults and deploy `app/error.vue`.

## Affected Areas
- `blog/nuxt.config.ts`
- `blog/app/composables/useApiBase.ts` (new)
- `blog/app/composables/useBlogService.ts`
- `blog/app/components/About/index.vue`
- `blog/app/components/Markdown/index.vue`
- `blog/app/components/Social-Share/index.vue`
- `blog/app/error.vue` (new)
- `docker-compose.yml`

## Risks & Mitigations
- *Risk*: SSR requests failing in local development if internal network URL is unavailable.
  *Mitigation*: Default `apiBaseUrl` fallback to local `http://localhost:3000/api/v1` or public URL.
- *Risk*: Hydration mismatches between SSR and client fetch responses.
  *Mitigation*: Use standard Nuxt `useAsyncData` caching with stable response structures.

## Rollback Plan
Revert changes to `blog/` and `docker-compose.yml` via Git commit revert and re-deploy previous Docker images.

## Success Criteria
- Blog homepage, about page, and article pages render without 500 errors in Docker production environment.
- Server-side rendering successfully fetches data from Guilliman over Docker internal network.
- `app/error.vue` catches runtime exceptions without blank screens.
- Zero TypeScript and build errors in `blog` (`bun run build`).
