import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { ref } from 'vue';
import ButtonDownload from '~/components/Button/Download.vue';
import ButtonLinkExternal from '~/components/Button/LinkExternal.vue';
import ButtonMenu from '~/components/Button/Menu.vue';
import FilterOptions from '~/components/FilterOptions.vue';

describe('Control Components', () => {
  describe('ButtonDownload', () => {
    it('should render download link with href and slot content', async () => {
      const wrapper = await mountSuspended(ButtonDownload, {
        props: { url: '/files/cv.pdf' },
        slots: { default: 'Download CV' },
      });

      const anchor = wrapper.find('a');
      expect(anchor.attributes('href')).toBe('/files/cv.pdf');
      expect(anchor.attributes('download')).toBeDefined();
      expect(anchor.text()).toBe('Download CV');
    });
  });

  describe('ButtonLinkExternal', () => {
    it('should render external link with target blank and nofollow', async () => {
      const wrapper = await mountSuspended(ButtonLinkExternal, {
        props: { enlace: 'https://example.com' },
        slots: { default: 'Visit Site' },
      });

      const anchor = wrapper.find('a');
      expect(anchor.attributes('href')).toBe('https://example.com');
      expect(anchor.attributes('target')).toBe('_blank');
      expect(anchor.attributes('rel')).toBe('nofollow');
      expect(anchor.text()).toBe('Visit Site');
    });
  });

  describe('ButtonMenu', () => {
    it('should emit pressButton event on click', async () => {
      const wrapper = await mountSuspended(ButtonMenu);

      await wrapper.find('button').trigger('click');
      expect(wrapper.emitted('pressButton')).toBeTruthy();
      expect(wrapper.emitted('pressButton')?.length).toBe(1);
    });
  });

  describe('FilterOptions', () => {
    it('should render options list plus All button', async () => {
      const selected = ref('');
      const wrapper = await mountSuspended(FilterOptions, {
        props: {
          filterOptions: ['Vue', 'React', 'Node'],
          modelValue: selected.value,
          'onUpdate:modelValue': (val: string) => {
            selected.value = val;
          },
        },
      });

      const buttons = wrapper.findAll('button');
      expect(buttons).toHaveLength(4); // Vue, React, Node, All
      expect(buttons[0].text()).toBe('Vue');
      expect(buttons[3].text()).toBe('All');
    });

    it('should emit update when option or All is clicked', async () => {
      const wrapper = await mountSuspended(FilterOptions, {
        props: {
          filterOptions: ['Vue', 'React'],
          modelValue: 'Vue',
        },
      });

      const buttons = wrapper.findAll('button');
      await buttons[1].trigger('click'); // React
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['React']);

      await buttons[2].trigger('click'); // All
      expect(wrapper.emitted('update:modelValue')?.[1]).toEqual(['']);
    });
  });
});
