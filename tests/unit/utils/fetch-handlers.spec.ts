import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import {
  fetchAboutPage,
  fetchBlogPage,
  fetchPortfolioPage,
  fetchLinksPage,
} from '~/utils/fetch-handlers';

const { mockFetch } = vi.hoisted(() => ({
  mockFetch: vi.fn(),
}));

mockNuxtImport('$fetch', () => mockFetch);

describe('fetch-handlers utils', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe('fetchAboutPage', () => {
    it('should successfully fetch and return about, skills, and experiences', async () => {
      const mockAbout = [
        {
          id: '1',
          type: 'paragraph',
          body: 'Bio',
          caption: '',
          emoji: null,
          object: 'block',
        },
      ];
      const mockSkills = [
        { id: '2', name: 'Vue', icon: 'vue', category: 'frontend' },
      ];
      const mockExperiences = [{ id: '3', role: 'Engineer', company: 'Corp' }];

      mockFetch.mockImplementation((url: string) => {
        if (url.includes('/about-me')) return Promise.resolve(mockAbout);
        if (url.includes('/skills')) return Promise.resolve(mockSkills);
        if (url.includes('/experience'))
          return Promise.resolve(mockExperiences);
        return Promise.reject(new Error('Unknown endpoint'));
      });

      const result = await fetchAboutPage();
      expect(result).toEqual({
        about: mockAbout,
        skills: mockSkills,
        experiences: mockExperiences,
      });
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });

    it('should fallback to empty arrays when responses are falsy/null', async () => {
      mockFetch.mockImplementation(() => Promise.resolve(null));

      const result = await fetchAboutPage();
      expect(result).toEqual({
        about: [],
        skills: [],
        experiences: [],
      });
    });

    it('should catch 500 or network errors and return fallback with hasError: true without throwing', async () => {
      mockFetch.mockRejectedValue(new Error('Internal Server Error 500'));

      const result = await fetchAboutPage();
      expect(result).toEqual({
        about: [],
        skills: [],
        experiences: [],
        hasError: true,
      });
    });

    it('should handle partial rejection when one endpoint fails in Promise.all and log a warning', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      mockFetch.mockImplementation((url: string) => {
        if (url.includes('/about-me')) return Promise.resolve([{ id: '1' }]);
        if (url.includes('/skills'))
          return Promise.reject(new Error('Skills endpoint down'));
        return Promise.resolve([]);
      });

      const result = await fetchAboutPage();
      expect(result.hasError).toBe(true);
      expect(result.about).toEqual([]);
      expect(result.skills).toEqual([]);
      expect(warnSpy).toHaveBeenCalledWith(
        'Failed to fetch about page data:',
        expect.any(Error),
      );
      warnSpy.mockRestore();
    });
  });

  describe('fetchBlogPage', () => {
    it('should fetch and return blog posts data', async () => {
      const mockResponse = {
        posts: [{ id: 'post-1', Post: 'Hello World' } as any],
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await fetchBlogPage();
      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/blog'));
    });

    it('should catch 500 or network errors and return fallback with hasError: true without throwing', async () => {
      mockFetch.mockRejectedValue(new Error('500 Internal Server Error'));

      const result = await fetchBlogPage();
      expect(result).toEqual({
        posts: [],
        hasError: true,
      });
    });
  });

  describe('fetchPortfolioPage', () => {
    it('should fetch and return portfolio page data', async () => {
      const mockResponse = {
        content: [],
        projects: [],
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await fetchPortfolioPage();
      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/portfolio'),
      );
    });

    it('should catch 500 or network errors and return fallback with hasError: true without throwing', async () => {
      mockFetch.mockRejectedValue(new Error('500 Internal Server Error'));

      const result = await fetchPortfolioPage();
      expect(result).toEqual({
        content: [],
        projects: [],
        hasError: true,
      });
    });
  });

  describe('fetchLinksPage', () => {
    it('should fetch and return links array', async () => {
      const mockLinks = [
        { id: 'link-1', Name: 'GitHub', Link: 'https://github.com' } as any,
      ];
      mockFetch.mockResolvedValue(mockLinks);

      const result = await fetchLinksPage();
      expect(result).toEqual(mockLinks);
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/links'));
    });

    it('should catch 500 or network errors and return empty array fallback without throwing', async () => {
      mockFetch.mockRejectedValue(new Error('500 Internal Server Error'));

      const result = await fetchLinksPage();
      expect(result).toEqual([]);
    });
  });
});
