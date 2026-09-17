# Changelog - Lascar Blog (Nuxt 4 Portal)

Todos los cambios notables en este proyecto serán documentados en este archivo siguiendo [Conventional Commits](https://www.conventionalcommits.org/).

## [v0.2.0] - 2026-09-17

### Características
- **i18n**: integración completa con `@nuxtjs/i18n`, estrategia `prefix_except_default` y soporte dual ES/EN (`feat(i18n)`).
- **resilience**: manejo de estados de error, reintentos de red y cobertura en Vitest (`feat(blog)`).

### Refactors & Correcciones
- **a11y**: mejoras de accesibilidad (a11y), ergonomía móvil y SEO reactivo con TDD (`refactor(blog)`).
- **views**: soporte tanto para propiedades aplanadas como anidadas desde Guilliman API (`fix(views)`).

---

## [v0.1.0] - 2026-08-28

### Características
- Portal público desarrollado con Nuxt 4, Nitro y Vue 3.5.
- Renderizado híbrido y contenido dinámico respaldado por Notion API vía Guilliman.
- Suite de pruebas unitarias con Vitest y E2E con Playwright.
