import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useApiBase } from '~/composables/useApiBase';

describe('useApiBase composable', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should return configured public apiBaseUrl by default', () => {
    const config = useRuntimeConfig();
    const result = useApiBase();
    expect(result).toBe(config.public.apiBaseUrl);
  });

  it('should reflect dynamically updated runtime configuration', () => {
    const config = useRuntimeConfig();
    const original = config.public.apiBaseUrl;
    config.public.apiBaseUrl = 'https://custom-test-api.dev/api/v1';

    try {
      const result = useApiBase();
      expect(result).toBe('https://custom-test-api.dev/api/v1');
    } finally {
      config.public.apiBaseUrl = original;
    }
  });
});
