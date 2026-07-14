# Design: Nuxt 4 Upgrade for Blog Project

## Technical Approach
We will implement **Option 1 (Incremental Update with compatibilityVersion 4)** as defined in the exploration observation. This represents the modern Nuxt 4 standard where frontend application directories and files are isolated under a root `app/` folder. This strategy guarantees cleaner separation, optimized Vite HMR performance, and consistent path resolutions using standard Nuxt aliases (`~/` and `@/`).

The backend API routes located in `server/` and static public assets in `public/` will remain at the root level of the project.

---

## Architecture Decisions

### Decision: Directory Structure Modernization
**Choice**: Move pages, components, layouts, assets, utils, and all custom directories (`stores`, `interfaces`, `adapters`, `vendors`) into a new `app/` directory.
**Alternatives considered**: Option 2 (Keep legacy root structure and disable/opt-out of `app/` folder conventions in Nuxt 4).
**Rationale**: Keeping the root directory clean minimizes project configuration overhead, scopes Vite HMR file watching, and guarantees compatibility with future Nuxt releases. Moving custom directories along with standard directories ensures relative import statements remain unbroken.

### Decision: Package Manager Migration
**Choice**: Migrate package manager from `pnpm` to `bun`.
**Alternatives considered**: Retaining `pnpm`.
**Rationale**: Aligning with the workspace's convention of using Bun. Bun speeds up dependency installation and container image building processes.

### Decision: Icon Module Upgrade
**Choice**: Swap legacy module `nuxt-icon` with `@nuxt/icon` and update `app.config.ts` configuration.
**Alternatives considered**: Maintaining `nuxt-icon` (deprecated and incompatible with Nuxt 4).
**Rationale**: `@nuxt/icon` is the official Nuxt module for icon rendering and supports modern Nuxt 4 rendering workflows.

---

## Data Flow
Nuxt 4 routes requests through the root `server/` directory for APIs and serves files from the root `public/` directory, while rendering components and page routers from the `app/` directory.

```mermaid
graph TD
    Client[Browser Client]
    subgraph Blog Root
        Server[server/api/*]
        Public[public/*]
        NuxtConfig[nuxt.config.ts]
    end
    subgraph Client Application (app/)
        Pages[app/pages/*]
        Components[app/components/*]
        Stores[app/stores/*]
        Adapters[app/adapters/*]
        Vendors[app/vendors/*]
        Interfaces[app/interfaces/*]
    end

    Client -->|API Requests| Server
    Client -->|Static Assets| Public
    Client -->|Page Load & SSR| Pages
    Pages --> Components
    Pages --> Stores
    Components --> Stores
    Stores --> Adapters
    Adapters --> Vendors
    Vendors -->|Notion SDK| Server
```

---

## File Changes

### Directory Relocation Mapping
| Source Directory/File | Target Directory/File | Description |
| :--- | :--- | :--- |
| `blog/components/` | `blog/app/components/` | Core components folder. |
| `blog/pages/` | `blog/app/pages/` | Routing pages. |
| `blog/layouts/` | `blog/app/layouts/` | View layouts templates. |
| `blog/assets/` | `blog/app/assets/` | Static CSS/fonts. |
| `blog/utils/` | `blog/app/utils/` | Frontend utility helpers. |
| `blog/stores/` | `blog/app/stores/` | Pinia store folders. |
| `blog/interfaces/` | `blog/app/interfaces/` | Custom TypeScript interfaces. |
| `blog/adapters/` | `blog/app/adapters/` | Domain structure adapters. |
| `blog/vendors/` | `blog/app/vendors/` | External services connectors. |
| `blog/app.vue` | `blog/app/app.vue` | Main application view component. |
| `blog/app.config.ts` | `blog/app/app.config.ts` | Main application configuration. |
| `blog/constantes.ts` | `blog/app/constantes.ts` | Constant constants values file. |
| **`blog/server/`** | **`blog/server/`** | **No Change** (Kept at root). |
| **`blog/public/`** | **`blog/public/`** | **No Change** (Kept at root). |

### Configuration and Script Edits
| File | Action | Description |
| :--- | :--- | :--- |
| `blog/pnpm-lock.yaml` | **Delete** | Remove old pnpm lockfile. |
| `blog/bun.lock` | **Create** | Generate new Bun lockfile via installation. |
| `blog/package.json` | **Modify** | Upgrade Nuxt, Pinia, swap `nuxt-icon` with `@nuxt/icon`. |
| `blog/nuxt.config.ts` | **Modify** | Add `compatibilityVersion: 4`, adjust Pinia scanning path, swap icon modules. |
| `blog/tailwind.config.js` | **Modify** | Update scanning content path references to target files inside `./app/`. |
| `blog/Dockerfile` | **Modify** | Re-engineer building container to use Alpine Bun base images. |

---

## Interfaces / Contracts

### `nuxt.config.ts`
```typescript
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },

  // Enable Nuxt 4 behavior
  future: {
    compatibilityVersion: 4,
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@morev/vue-transitions/nuxt",
    "@nuxt/icon", // Upgraded from "nuxt-icon"
    [
      "@pinia/nuxt",
      { autoImports: ["defineStore", ["defineStore", "definePiniaStore"]] },
    ],
    "dayjs-nuxt",
  ],

  pinia: {
    storesDirs: ["./app/stores/**"], // Scanned under new app directory
  },

  devServer: {
    port: 3000,
  },

  dayjs: {
    locales: ["es", "en"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "es",
  },

  runtimeConfig: {
    notionSecret: process.env.NOTION_API_KEY,
    homePage: process.env.NOTION_HOME_ID,
    aboutPage: process.env.NOTION_ABOUT_ID,
    blogPage: process.env.NOTION_BLOG_ID,
    portfolioPage: process.env.NOTION_PORTFOLIO_ID,
    linkTreePage: process.env.NOTION_LINK_TREE_ID,
    environment: process.env.APP_ENVIRONMENT,
    devEnv: process.env.DEVELOPMENT_STAGE,
    prodEnv: process.env.PRODUCTION_STAGE,
  },

  compatibilityDate: "2024-09-29",
});
```

### `app/app.config.ts` (Relocated and Configured)
```typescript
export default defineAppConfig({
  icon: { // Changed key from "nuxtIcon" to "icon"
    size: "24px",
    aliases: {
      gitHub: "mdi:github",
      twitter: "mdi:twitter",
      instagram: "mdi:instagram",
      linkedIn: "fa:linkedin",
      "linkedIn-solid": "mdi:linkedin",
      menu: "mdi:menu",
      cross: "mdi:close",
    },
  },
});
```

### `tailwind.config.js`
```javascript
module.exports = {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2B4162",
        electric: "#1b3e9b",
        secondary: "#4D7EA8",
        gold: "#D4AF37",
        "black-coffee": "#322A26",
        bone: "#E0DDCF",
      },
      fontFamily:{
        'roboto-mono': ['Roboto Mono'],
        metalick: ['Metalick'],
      }
    },
    keyframes: {
      expand: {
        "0%": { transform: "scale(0.8)" },
        "25%": { transform: "scale(1.33)" },
      },
    },
    animation: {
      expand: "expand 1s ease-in-out infinite",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
    },
  },
  plugins: [],
};
```

### `Dockerfile`
```dockerfile
FROM --platform=linux/amd64 oven/bun:1-alpine as dev-deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM --platform=linux/amd64 oven/bun:1-alpine as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM --platform=linux/amd64 oven/bun:1-alpine as prod-deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

FROM --platform=linux/amd64 oven/bun:1-alpine as prod
EXPOSE 3000
WORKDIR /app

ENV NOTION_API_KEY=${NOTION_API_KEY}
ENV APP_ENVIRONMENT=${APP_ENVIRONMENT}
ENV NOTION_HOME_ID=${NOTION_HOME_ID}
ENV NOTION_ABOUT_ID=${NOTION_ABOUT_ID}
ENV NOTION_BLOG_ID=${NOTION_BLOG_ID}
ENV NOTION_PORTFOLIO_ID=${NOTION_PORTFOLIO_ID}
ENV NOTION_LINK_TREE_ID=${NOTION_LINK_TREE_ID}
ENV DEVELOPMENT_STAGE=${DEVELOPMENT_STAGE}
ENV PRODUCTION_STAGE=${PRODUCTION_STAGE}

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/.output ./.output
CMD ["bun", "run", ".output/server/index.mjs"]
```

---

## Testing Strategy
We will execute testing in progressive tiers to verify structural integrity and dependency alignment.

| Layer | What to Test | Approach / Script |
| :--- | :--- | :--- |
| **Dependency Resolution** | Lockfile creation & dependency resolution. | `bun install` |
| **Type Check** | Validation of Nuxt generated type files and custom TypeScript code imports. | `bun run typecheck` or `npx nuxi typecheck` |
| **Production Build** | Verification that compilation of bundles succeeds. | `bun run build` |
| **Dev Server / Hydration** | Local preview rendering, page routing, module integration (Tailwind classes, custom stores, icons). | `bun run dev` & visual inspect for hydration mismatches or console warnings. |
| **Docker Production Bundle** | Compile checking of Alpine container image layers and execution environment. | `docker compose build` & startup testing. |

---

## Migration / Rollout
1. **Initialize `app/` Directory**: Create the directory `./blog/app`.
2. **Move Source Files**: Run directory movements of `pages`, `components`, `layouts`, `assets`, `utils`, `stores`, `interfaces`, `adapters`, `vendors`, `app.vue`, `app.config.ts`, `constantes.ts` to `app/`.
3. **Delete Lockfile**: Delete `./blog/pnpm-lock.yaml`.
4. **Update package.json**: Edit dependencies list (add `@nuxt/icon`, upgrade `nuxt` to `^4.0.0`, Pinia, etc.).
5. **Update configuration parameters**: Edit `./blog/nuxt.config.ts`, `./blog/app/app.config.ts`, `./blog/tailwind.config.js`, `./blog/Dockerfile`.
6. **Install dependencies**: Run `bun install` in `./blog` to create `bun.lock`.
7. **Perform Typecheck**: Run `bun run typecheck` to verify import resolution.
8. **Run Build & Test**: Run `bun run build` to confirm output compilation.

---

## Open Questions
- None. All requirements and dependencies are resolved.
