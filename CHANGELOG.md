# Changelog

All notable changes to this project are documented in this file. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.2] - 2026-11-06

### Changed

- **docs**: README and CHANGELOG are now in English, and the CHANGELOG history matches the published releases.
- **ci**: releases are published from the CHANGELOG when a release PR from `dev` merges into `main`; CI (tests and build) runs on `dev` and on pull requests.

## [0.1.1] - 2026-09-26

### Changed
- **docs**: README now shows the "Built with Gentle-AI" attribution badge.

## [0.1.0] - 2026-09-17

### Added
- **portal**: first tagged release of the public Nuxt SSR portal: home, professional profile, blog with article detail, project portfolio and social links pages.
- **ci**: automated GitHub Releases and publishing of the `ghcr.io/ragehardrack/dan-website-nuxt3` image on pushes to `main`.
- **i18n**: bilingual Spanish/English content with the `prefix_except_default` route strategy and a language switcher.
- **blog**: non-fatal error card with a retry button on the listing pages when the Guilliman API fails, plus custom 404/500 error pages.
- **dev**: local development through Portless on `http://blog.localhost:1355` over plain HTTP.
- **about**: downloadable CV.

### Changed
- **core**: upgraded to Nuxt 4 with the new `app/` directory layout, Bun as the package manager and the workspace Prettier import order.
- **api**: content is now read from Guilliman's REST API instead of being queried from Notion by the blog itself, with the public API URL as the default base.
- **a11y**: accessibility, mobile ergonomics and per-page reactive SEO were improved, with unit test coverage.

### Fixed
- **views**: listing pages that returned production 500 errors and mismatched SSR data contracts.
- **views**: support for both flattened and nested properties returned by the Guilliman API.
- **blog**: audit corrections for accessibility, list grouping, dynamic SEO, API 404 handling and security.

### Removed
- **server**: the Nitro `server/` API layer and the direct Notion integration, including its environment credentials.
- **deps**: the `@morev/vue-transitions` dependency, replaced by native Vue 3 transitions.
