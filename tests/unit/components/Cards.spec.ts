import { describe, it, expect, vi } from 'vitest';
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import Card from '~/components/Card/index.vue';
import CardBlog from '~/components/Card/Blog.vue';
import CardProject from '~/components/Card/Project.vue';
import CardExperience from '~/components/Card/Experience.vue';
import CardSkill from '~/components/Card/Skill.vue';
import CardWide from '~/components/Card/Wide.vue';
import MainCard from '~/components/Blog/MainCard.vue';
import type { IPost, IProjectProperties, IExperienceProperties, ISkillProperties } from '~/interfaces';

const { mockNavigateTo } = vi.hoisted(() => ({
  mockNavigateTo: vi.fn(),
}));

mockNuxtImport('navigateTo', () => mockNavigateTo);

describe('Card Components', () => {
  describe('Card (Base)', () => {
    it('should render default styling when no props provided', async () => {
      const wrapper = await mountSuspended(Card);
      expect(wrapper.classes()).toContain('bg-primary');
      expect(wrapper.classes()).toContain('cursor-auto');
    });

    it('should render header, content, and footer slots', async () => {
      const wrapper = await mountSuspended(Card, {
        props: {
          hasClick: true,
          hasHover: true,
          color: 'secondary',
        },
        slots: {
          header: '<div class="header-slot">Header</div>',
          content: '<div class="content-slot">Content</div>',
          footer: '<div class="footer-slot">Footer</div>',
        },
      });

      expect(wrapper.find('.header-slot').text()).toBe('Header');
      expect(wrapper.find('.content-slot').text()).toBe('Content');
      expect(wrapper.find('.footer-slot').text()).toBe('Footer');
      expect(wrapper.classes()).toContain('cursor-pointer');
      expect(wrapper.classes()).toContain('bg-secondary');
    });
  });

  describe('CardBlog', () => {
    const mockPost: IPost = {
      id: 'post-123',
      Post: 'Nuxt 4 Complete Guide',
      Slug: 'nuxt-4-guide',
      Brief: 'A thorough overview of Nuxt 4 features.',
      Tags: ['Vue', 'Nuxt', 'Testing'],
      Image_URL: 'https://example.com/nuxt.png',
      Fecha_Publicacion: '2024-06-15',
      Status: 'Published',
      Prevent_Index: false,
      Language: 'en',
      Stage: 'live',
    };

    it('should render post metadata, title, brief, tags, and link', async () => {
      const wrapper = await mountSuspended(CardBlog, {
        props: {
          post: mockPost,
        },
      });

      expect(wrapper.text()).toContain('Nuxt 4 Complete Guide');
      expect(wrapper.text()).toContain('A thorough overview of Nuxt 4 features.');
      expect(wrapper.text()).toContain('Vue');
      expect(wrapper.text()).toContain('Nuxt');
      expect(wrapper.text()).toContain('Testing');
      expect(wrapper.find('img').attributes('src')).toBe('https://example.com/nuxt.png');
    });
  });

  describe('MainCard', () => {
    const mockPost: IPost = {
      id: 'main-1',
      Post: 'Featured Architecture Post',
      Slug: 'featured-arch',
      Brief: 'Deep dive into frontend architecture patterns.',
      Tags: ['Architecture'],
      Image_URL: 'https://example.com/arch.png',
      Fecha_Publicacion: '2024-07-01',
      Status: 'Published',
      Prevent_Index: false,
      Language: 'en',
      Stage: 'live',
    };

    it('should render main featured card with post info', async () => {
      const wrapper = await mountSuspended(MainCard, {
        props: {
          post: mockPost,
        },
      });

      expect(wrapper.text()).toContain('Featured Architecture Post');
      expect(wrapper.text()).toContain('Deep dive into frontend architecture patterns.');
      expect(wrapper.text()).toContain('Architecture');
      expect(wrapper.find('img').attributes('src')).toBe('https://example.com/arch.png');
    });
  });

  describe('CardProject', () => {
    const mockProjectProps: IProjectProperties = {
      Name: 'Portfolio Showcase',
      Slug: 'portfolio-showcase',
      Tags: ['Nuxt', 'TailwindCSS'],
      Preview: 'https://example.com/preview.png',
      Enlace: 'https://example.com/project',
      Github: 'https://github.com/danielcolmenares/project',
      Fecha_Fin: '2024-01-01',
      Fecha_Inicio: '2023-01-01',
      State: 'Done',
      Brief: 'A showcase project',
      Stage: 'live',
    };

    it('should render project name, tags, and trigger navigation on click', async () => {
      const wrapper = await mountSuspended(CardProject, {
        props: {
          projectProps: mockProjectProps,
        },
      });

      expect(wrapper.text()).toContain('Portfolio Showcase');
      expect(wrapper.text()).toContain('Nuxt');
      expect(wrapper.text()).toContain('TailwindCSS');
      expect(wrapper.find('img').attributes('src')).toBe('https://example.com/preview.png');

      await wrapper.find('article').trigger('click');
      expect(mockNavigateTo).toHaveBeenCalledWith('/portfolio/projects/portfolio-showcase');
    });
  });

  describe('CardExperience', () => {
    const mockXpProps: IExperienceProperties = {
      Work: 'Senior Frontend Engineer',
      Period: '2022 - Present',
      Description: 'Building high performance web platforms.',
      Stack: ['Vue', 'TypeScript', 'Node.js'],
      Stage: 'live',
    };

    it('should render work title, period, description, and stack pills', async () => {
      const wrapper = await mountSuspended(CardExperience, {
        props: {
          xpProperties: mockXpProps,
        },
      });

      expect(wrapper.text()).toContain('Senior Frontend Engineer');
      expect(wrapper.text()).toContain('2022 - Present');
      expect(wrapper.text()).toContain('Building high performance web platforms.');
      expect(wrapper.text()).toContain('Vue');
      expect(wrapper.text()).toContain('TypeScript');
      expect(wrapper.text()).toContain('Node.js');
    });
  });

  describe('CardSkill', () => {
    const mockSkillProps: ISkillProperties = {
      Name: 'TypeScript',
      Image_URL: 'https://example.com/ts.png',
      Category: 'Languages',
      Level: 'Advanced',
      Stage: 'live',
    };

    it('should render skill image with correct alt and title', async () => {
      const wrapper = await mountSuspended(CardSkill, {
        props: {
          skillProps: mockSkillProps,
        },
      });

      expect(wrapper.attributes('title')).toBe('TypeScript');
      expect(wrapper.find('img').attributes('src')).toBe('https://example.com/ts.png');
    });
  });

  describe('CardWide', () => {
    it('should render default cursor when isLink is false', async () => {
      const wrapper = await mountSuspended(CardWide);
      expect(wrapper.classes()).toContain('cursor-auto');
    });

    it('should render aside, header, content, and footer slots', async () => {
      const wrapper = await mountSuspended(CardWide, {
        props: { isLink: true },
        slots: {
          aside: '<div class="aside-slot">Aside</div>',
          header: '<div class="header-slot">Header</div>',
          content: '<div class="content-slot">Content</div>',
          footer: '<div class="footer-slot">Footer</div>',
        },
      });

      expect(wrapper.find('.aside-slot').text()).toBe('Aside');
      expect(wrapper.find('.header-slot').text()).toBe('Header');
      expect(wrapper.find('.content-slot').text()).toBe('Content');
      expect(wrapper.find('.footer-slot').text()).toBe('Footer');
      expect(wrapper.classes()).toContain('cursor-pointer');
    });
  });
});
