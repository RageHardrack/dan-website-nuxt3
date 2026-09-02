import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
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
      const mockAbout = [{ id: '1', type: 'paragraph', body: 'Bio', caption: '', emoji: null, object: 'block' }];
      const mockSkills = [{ id: '2', name: 'Vue', icon: 'vue', category: 'frontend' }];
      const mockExperiences = [{ id: '3', role: 'Engineer', company: 'Corp' }];

      mockFetch.mockImplementation((url: string) => {
        if (url.includes('/about-me')) return Promise.resolve(mockAbout);
        if (url.includes('/skills')) return Promise.resolve(mockSkills);
        if (url.includes('/experience')) return Promise.resolve(mockExperiences);
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

    it('should propagate errors if any fetch fails', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));
      await expect(fetchAboutPage()).rejects.toThrow('Network error');
    });
  });

  describe('fetchBlogPage', () => {
    it('should fetch and return blog posts data', async () => {
      const mockResponse = { posts: [{ id: 'post-1', Post: 'Hello World' } as any] };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await fetchBlogPage();
      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/blog'));
    });
  });

  describe('fetchPortfolioPage', () => {
    it('should fetch and return portfolio page data', async () => {
      const mockResponse = {
        results: [],
        about_me: [],
        experience: [],
        projects: [],
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await fetchPortfolioPage();
      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/portfolio'));
    });
  });

  describe('fetchLinksPage', () => {
    it('should fetch and return links array', async () => {
      const mockLinks = [{ id: 'link-1', Name: 'GitHub', Link: 'https://github.com' } as any];
      mockFetch.mockResolvedValue(mockLinks);

      const result = await fetchLinksPage();
      expect(result).toEqual(mockLinks);
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/links'));
    });
  });
});
