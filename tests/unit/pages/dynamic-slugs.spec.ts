import { flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';

import BlogSlugPage from '~/pages/Blog/[slug].vue';
import ProjectSlugPage from '~/pages/Portfolio/Projects/[slug].vue';

const { mockUseSeoMeta, mockLazyFetchData } = vi.hoisted(() => ({
  mockUseSeoMeta: vi.fn(),
  mockLazyFetchData: {
    blog: {
      value: {
        Post: 'Test Post Title',
        Brief: 'Test post brief description',
        Image_URL: 'https://example.com/test.png',
        Fecha_Publicacion: '2026-09-01',
        content: [{ id: '1', type: 'paragraph', body: 'Test content body' }],
        Prevent_Index: false,
      },
    },
    project: {
      value: {
        project: {
          properties: {
            Name: 'Awesome Project',
            Slug: 'awesome-project',
            Preview: 'https://example.com/project-preview.png',
            Tags: ['Vue', 'Nuxt'],
            Repository: 'https://github.com/example/repo',
          },
        },
        content: [
          { id: '2', type: 'paragraph', body: 'Project description content' },
        ],
      },
    },
  },
}));

mockNuxtImport('useSeoMeta', () => mockUseSeoMeta);

mockNuxtImport('useLazyFetch', () => {
  return (url: string) => {
    if (url.includes('/blog/')) {
      return Promise.resolve({
        data: ref(mockLazyFetchData.blog.value),
        pending: ref(false),
      });
    }
    return Promise.resolve({
      data: ref(mockLazyFetchData.project.value),
      pending: ref(false),
    });
  };
});

describe('Dynamic Route Pages SEO & Reactivity', () => {
  beforeEach(() => {
    mockUseSeoMeta.mockClear();
  });

  it('Blog/[slug].vue should configure useSeoMeta with reactive getter functions and render post', async () => {
    const wrapper = await mountSuspended(BlogSlugPage, {
      route: '/blog/test-post',
    });
    await flushPromises();

    expect(wrapper.text()).toContain('Test Post Title');
    expect(wrapper.text()).toContain('Test content body');
    expect(mockUseSeoMeta).toHaveBeenCalled();

    const seoCallArg = mockUseSeoMeta.mock.calls[0][0];
    expect(typeof seoCallArg.title).toBe('function');
    expect(seoCallArg.title()).toBe('Test Post Title - Daniel Colmenares');
    expect(typeof seoCallArg.description).toBe('function');
    expect(seoCallArg.description()).toBe('Test post brief description');
  });

  it('Portfolio/Projects/[slug].vue should configure useSeoMeta with reactive getter functions and render project', async () => {
    const wrapper = await mountSuspended(ProjectSlugPage, {
      route: '/portfolio/projects/awesome-project',
    });
    await flushPromises();

    expect(wrapper.text()).toContain('Awesome Project');
    expect(wrapper.text()).toContain('Vue');
    expect(wrapper.text()).toContain('Nuxt');
    expect(mockUseSeoMeta).toHaveBeenCalled();

    const seoCallArg = mockUseSeoMeta.mock.calls[0][0];
    expect(typeof seoCallArg.title).toBe('function');
    expect(seoCallArg.title()).toBe('Awesome Project - Daniel Colmenares');
  });
});
