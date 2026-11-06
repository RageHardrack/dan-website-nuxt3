# Lascar Blog & Web Portal

<a href="https://github.com/Gentleman-Programming/gentle-ai">
  <img width="220" src="https://raw.githubusercontent.com/Gentleman-Programming/gentle-ai/main/docs/assets/brand/built-with-gentle-ai.png" alt="Built with Gentle-AI" />
</a>

The public web portal and personal portfolio/blog platform of the **Lascar** ecosystem, built with
**Nuxt 4** (Vue 3 SSR). It is a decoupled frontend presentation layer: it has no backend of its own
and consumes the REST endpoints exposed by the **Guilliman** API with built-in fault tolerance.

Content is authored in Notion, but this project never talks to Notion: Guilliman normalizes it and
serves it over REST. There is no Nitro `server/` layer here.

---

## ⚡ Quick path (local development)

1. **Install dependencies**:

   ```bash
   bun install
   ```

2. **Configure the environment**:

   ```bash
   cp .env.example .env
   ```

   Point `NUXT_API_BASE_URL` (server side) and `NUXT_PUBLIC_API_BASE_URL` (client side) at a
   running Guilliman. The workspace skill `lascar-local-dev` starts it for you (shortcut
   `init-blog`).

3. **Start the dev server** (Portless, unprivileged port 1355, plain HTTP):

   ```bash
   bun run dev
   ```

4. **Open it in the browser**: `http://blog.localhost:1355`.

`bun run dev` and `bun run dev:http` are equivalent: both run Portless with
`PORTLESS_PORT=1355 PORTLESS_HTTPS=0`, so no TLS and no privileged ports are involved.

---

## 🛠️ Tech stack

| **Framework**    | [Nuxt 4](https://nuxt.com/)                              | `^4.5.2` (Vue 3.5 SSR)          | Hybrid rendering (SSR / client) and convention-based routing             |
| ---------------- | -------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------ |
| **i18n**         | [@nuxtjs/i18n](https://i18n.nuxtjs.org/)                 | `^10.6.0`                       | Spanish/English with the `prefix_except_default` strategy                 |
| **Styles**       | [Tailwind CSS](https://tailwindcss.com/)                 | `^6.14.0`                       | Modular responsive utility system                                         |
| **State**        | [Pinia](https://pinia.vuejs.org/)                        | `^3.0.4` (`@pinia/nuxt`)        | Reactive global UI state                                                  |
| **HTTP client**  | `$fetch` (ofetch)                                        | Nuxt native                     | Resilient consumption of the Guilliman REST API, with a `?lang=` parameter |
| **Package mgr**  | [Bun](https://bun.sh/)                                   | `v1.4+`                         | Installation and script execution                                         |
| **Local proxy**  | [Portless](https://github.com/antfu-collective/portless) | Port `1355` (HTTP)              | Dev binding without root privileges or privileged ports                   |
| **Unit tests**   | [Vitest](https://vitest.dev/)                            | `^4.1.11` + `@nuxt/test-utils`  | Component, page and fetch-resilience tests                                |
| **E2E tests**    | [Playwright](https://playwright.dev/)                    | `^1.62.1`                       | Multi-viewport E2E (desktop & Pixel 7) and i18n                           |

---

## 🔌 API configuration

| Variable                    | Side     | Purpose                                                                      |
| --------------------------- | -------- | ---------------------------------------------------------------------------- |
| `NUXT_API_BASE_URL`         | Server   | Base URL the SSR requests use; in Compose it is `http://guilliman:3000/api/v1` |
| `NUXT_PUBLIC_API_BASE_URL`  | Client   | Base URL the browser uses; falls back to `API_BASE_URL`, then to the public production API |

`app/composables/useApiBase.ts` picks between them: the internal URL on the server, the public URL
on the client. Endpoints consumed (all under the `/api/v1` base): `/about-me`, `/skills`,
`/experience`, `/blog`, `/blog/:slug`, `/portfolio`, `/projects/:slug`, `/links`.

---

## 🛡️ Resilience and error handling

A two-layer defensive design against Guilliman outages and 5xx responses:

- **Defensive fetch handlers (`app/utils/fetch-handlers.ts`)**: every request (`fetchAboutPage`,
  `fetchBlogPage`, `fetchPortfolioPage`, `fetchLinksPage`) catches network exceptions and 5xx
  responses and returns typed structures with `{ hasError: true, ...defaults }`.
- **Inline error state (`app/components/ErrorMessage.vue`)**: the `/about`, `/blog` and `/portfolio`
  views show a non-fatal alert card with a retry button (`@retry="refresh"`), keeping `Navbar` and
  `Footer` fully interactive.

---

## 🌱 Branching and releases

This repository follows GitFlow with two long-lived branches:

| Branch     | Role                                                                  |
| ---------- | --------------------------------------------------------------------- |
| `main`     | Production. Only ever updated by merging a release PR.                 |
| `dev`      | Integration branch. `feat/` and `fix/` branches start here.            |

- `feat/` and `fix/` branches are created from `dev`; merging into `dev` needs no PR.
- `hotfix/` branches are created from `main` (PR into `main`, then back-merged into `dev`).
- Changes reach `main` **only** through a release PR from `dev`. A push straight to `main` is never
  the path, not even as a bypass.
- The release version and its notes come from the `[Unreleased]` section of `CHANGELOG.md`, which
  the release PR moves under a new version heading (`## [X.Y.Z] - YYYY-MM-DD`).
- Merging the release PR is what builds and publishes the container image to GHCR.

---

## 🐳 Running with Docker

The service runs inside the shared `lascar-network` from the pre-built GHCR image:

```bash
# From the Lascar workspace root
docker compose up -d blog
```

### Production environment variables

Set in the `.env` file at the root of the Lascar workspace:

| Variable      | Purpose                                                              | Example                 |
| ------------- | -------------------------------------------------------------------- | ----------------------- |
| `BLOG_DOMINIO`| Virtual domain for `nginx-proxy` and `acme-companion`                 | `dan-colmenares.com`    |
| `API_DOMINIO` | API domain used to build `NUXT_PUBLIC_API_BASE_URL` at runtime         | `api.dragon-azul.dev`   |

---

## 🧪 Testing and verification

| Command                  | Description                                                        |
| ------------------------ | ------------------------------------------------------------------ |
| `bun run test`           | Runs the full Vitest unit suite                                     |
| `bun run test:watch`     | Continuous interactive mode for TDD                                 |
| `bun run test:coverage`  | Generates the code coverage report (`@vitest/coverage-v8`)          |
| `bun run test:e2e`       | Runs the full Playwright E2E suite (desktop & mobile)               |
| `bun run test:e2e:ui`    | Interactive Playwright UI for visual debugging                      |
| `bun x vue-tsc --noEmit` | Strict TypeScript and Vue template type checking                     |
| `bun run format`         | Applies consistent formatting with Prettier                         |

---

## ✅ Verification checklist

- [ ] Dependencies install cleanly with `bun install`.
- [ ] `bun run dev` serves the portal at `http://blog.localhost:1355` over plain HTTP.
- [ ] Navigating to `/about`, `/blog` and `/portfolio` shows `ErrorMessage` with a retry option when the Guilliman API is down.
- [ ] The Vitest suite passes (`bun run test`).
- [ ] Type checking reports no errors (`bun x vue-tsc --noEmit`).
