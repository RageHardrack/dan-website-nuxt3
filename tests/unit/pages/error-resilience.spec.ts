import { flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';

import BlogPage from '~/pages/Blog/index.vue';
import AboutPage from '~/pages/About/index.vue';
import PortfolioPage from '~/pages/Portfolio/index.vue';
import ErrorMessage from '~/components/ErrorMessage.vue';

const { mockFetch } = vi.hoisted(() => ({
  mockFetch: vi.fn(),
}));

mockNuxtImport('$fetch', () => mockFetch);

describe('Pages Error Resilience', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe('About Page', () => {
    it('should render ErrorMessage when API fails with 500 error', async () => {
      mockFetch.mockRejectedValue(new Error('Guilliman API 500 error'));

      const wrapper = await mountSuspended(AboutPage);
      await flushPromises();

      const errorMessage = wrapper.findComponent(ErrorMessage);
      expect(errorMessage.exists()).toBe(true);
      expect(wrapper.find('[role="alert"]').exists()).toBe(true);
      expect(wrapper.text()).toContain('Ocurrió un error al cargar los datos.');
    });

    it('should trigger refresh when retry button is clicked in About page', async () => {
      mockFetch.mockRejectedValue(new Error('Guilliman API 500 error'));

      const wrapper = await mountSuspended(AboutPage);
      await flushPromises();
      const retryButton = wrapper.find('button[type="button"]');
      expect(retryButton.exists()).toBe(true);

      mockFetch.mockResolvedValue([]);
      await retryButton.trigger('click');
      await flushPromises();
      expect(mockFetch).toHaveBeenCalled();
    });

    it('should render page content normally when API succeeds', async () => {
      mockFetch.mockImplementation((url: string) => {
        if (url.includes('/about-me'))
          return Promise.resolve([
            { id: '1', body: 'About me content', type: 'paragraph' },
          ]);
        if (url.includes('/skills'))
          return Promise.resolve([
            { id: '2', properties: { Name: 'Vue', Tags: ['frontend'] } },
          ]);
        if (url.includes('/experience')) return Promise.resolve([]);
        return Promise.resolve([]);
      });

      const wrapper = await mountSuspended(AboutPage);
      await flushPromises();

      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
      expect(wrapper.text()).toContain('Download my CV');
      expect(wrapper.text()).toContain('Skills');
    });
  });

  describe('Blog Page', () => {
    it('should render ErrorMessage when API fails with 500 error', async () => {
      mockFetch.mockRejectedValue(new Error('Guilliman API 500 error'));

      const wrapper = await mountSuspended(BlogPage);
      await flushPromises();

      const errorMessage = wrapper.findComponent(ErrorMessage);
      expect(errorMessage.exists()).toBe(true);
      expect(wrapper.find('[role="alert"]').exists()).toBe(true);
      expect(wrapper.text()).toContain('Ocurrió un error al cargar los datos.');
    });

    it('should trigger refresh when retry button is clicked in Blog page', async () => {
      mockFetch.mockRejectedValue(new Error('Guilliman API 500 error'));

      const wrapper = await mountSuspended(BlogPage);
      await flushPromises();
      const retryButton = wrapper.find('button[type="button"]');
      expect(retryButton.exists()).toBe(true);

      mockFetch.mockResolvedValue({ posts: [] });
      await retryButton.trigger('click');
      await flushPromises();
      expect(mockFetch).toHaveBeenCalled();
    });

    it('should render blog content normally when API succeeds', async () => {
      mockFetch.mockResolvedValue({
        posts: [
          {
            id: 'post-1',
            properties: {
              Title: { title: [{ plain_text: 'My First Post' }] },
              Slug: { rich_text: [{ plain_text: 'my-first-post' }] },
              Date: { date: { start: '2026-09-01' } },
              Tags: { multi_select: [] },
              Published: { checkbox: true },
            },
          },
        ],
      });

      const wrapper = await mountSuspended(BlogPage);
      await flushPromises();

      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
      expect(wrapper.text()).toContain('Última publicación');
    });
  });

  describe('Portfolio Page', () => {
    it('should render ErrorMessage when API fails with 500 error', async () => {
      mockFetch.mockRejectedValue(new Error('Guilliman API 500 error'));

      const wrapper = await mountSuspended(PortfolioPage);
      await flushPromises();

      const errorMessage = wrapper.findComponent(ErrorMessage);
      expect(errorMessage.exists()).toBe(true);
      expect(wrapper.find('[role="alert"]').exists()).toBe(true);
      expect(wrapper.text()).toContain('Ocurrió un error al cargar los datos.');
    });

    it('should trigger refresh when retry button is clicked in Portfolio page', async () => {
      mockFetch.mockRejectedValue(new Error('Guilliman API 500 error'));

      const wrapper = await mountSuspended(PortfolioPage);
      await flushPromises();
      const retryButton = wrapper.find('button[type="button"]');
      expect(retryButton.exists()).toBe(true);

      mockFetch.mockResolvedValue({ content: [], projects: [] });
      await retryButton.trigger('click');
      await flushPromises();
      expect(mockFetch).toHaveBeenCalled();
    });

    it('should render portfolio content normally when API succeeds', async () => {
      mockFetch.mockResolvedValue({
        content: [],
        projects: [
          {
            id: 'proj-1',
            properties: {
              Name: 'Cool Project',
              Image_URL: 'https://example.com/img.png',
              Orden: 1,
              Tags: ['web'],
            },
          },
        ],
      });

      const wrapper = await mountSuspended(PortfolioPage);
      await flushPromises();

      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
      expect(wrapper.text()).toContain('Projects');
    });
  });
});
