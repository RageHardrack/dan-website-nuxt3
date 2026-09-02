import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    globals: true,
    include: ['tests/**/*.spec.ts'],
    exclude: ['e2e/**', 'node_modules/**', '.nuxt/**', 'dist/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
      exclude: [
        'node_modules/**',
        '.nuxt/**',
        'dist/**',
        'e2e/**',
        'tests/**',
        '**/*.d.ts',
        'playwright.config.ts',
        'vitest.config.ts',
        'app/assets/**',
      ],
    },
  },
});
