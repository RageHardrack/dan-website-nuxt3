import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Heading1 from '~/components/Heading/1.vue';
import Heading2 from '~/components/Heading/2.vue';
import Heading3 from '~/components/Heading/3.vue';
import Grid from '~/components/Grid/index.vue';
import GridSkills from '~/components/Grid/Skills.vue';
import GridTechs from '~/components/Grid/Techs.vue';

describe('Heading & Grid Components', () => {
  describe('Headings', () => {
    it('should render Heading1 with custom classes and slot', async () => {
      const wrapper = await mountSuspended(Heading1, {
        props: { customClass: 'text-red-500' },
        slots: { default: 'Main Title' },
      });

      expect(wrapper.element.tagName).toBe('H1');
      expect(wrapper.classes()).toContain('text-red-500');
      expect(wrapper.text()).toBe('Main Title');
    });

    it('should render Heading2 with custom classes and slot', async () => {
      const wrapper = await mountSuspended(Heading2, {
        props: { customClass: 'text-gold' },
        slots: { default: 'Section Title' },
      });

      expect(wrapper.element.tagName).toBe('H2');
      expect(wrapper.classes()).toContain('text-gold');
      expect(wrapper.text()).toBe('Section Title');
    });

    it('should render Heading3 with custom classes and slot', async () => {
      const wrapper = await mountSuspended(Heading3, {
        props: { customClass: 'text-white' },
        slots: { default: 'Subsection Title' },
      });

      expect(wrapper.element.tagName).toBe('H3');
      expect(wrapper.classes()).toContain('text-white');
      expect(wrapper.text()).toBe('Subsection Title');
    });
  });

  describe('Grid (Base)', () => {
    it('should render correct class for sm, md, lg and default sizes', async () => {
      const wrapperSm = await mountSuspended(Grid, {
        props: { size: 'sm' },
        slots: { default: '<div>item</div>' },
      });
      expect(wrapperSm.classes()).toContain('grid-cols-4');

      const wrapperMd = await mountSuspended(Grid, {
        props: { size: 'md' },
      });
      expect(wrapperMd.classes()).toContain('grid-cols-1');

      const wrapperLg = await mountSuspended(Grid, {
        props: { size: 'lg' },
      });
      expect(wrapperLg.classes()).toContain('grid-cols-1');

      const wrapperDefault = await mountSuspended(Grid, {
        props: { size: 'unknown' as any },
      });
      expect(wrapperDefault.classes()).toContain('grid-cols-1');
    });
  });

  describe('GridSkills', () => {
    it('should render correct class for sm, md, lg and default sizes', async () => {
      const wrapperSm = await mountSuspended(GridSkills, {
        props: { size: 'sm' },
      });
      expect(wrapperSm.classes()).toContain('grid-cols-4');

      const wrapperMd = await mountSuspended(GridSkills, {
        props: { size: 'md' },
      });
      expect(wrapperMd.classes()).toContain('grid-cols-2');

      const wrapperLg = await mountSuspended(GridSkills, {
        props: { size: 'lg' },
      });
      expect(wrapperLg.classes()).toContain('grid-cols-4');

      const wrapperDefault = await mountSuspended(GridSkills, {
        props: { size: 'unknown' as any },
      });
      expect(wrapperDefault.classes()).toContain('grid-cols-1');
    });
  });

  describe('GridTechs', () => {
    it('should render grid section for technologies', async () => {
      const wrapper = await mountSuspended(GridTechs, {
        slots: { default: '<div class="tech-item">Tech</div>' },
      });

      expect(wrapper.find('.tech-item').text()).toBe('Tech');
      expect(wrapper.classes()).toContain('grid');
    });
  });
});
