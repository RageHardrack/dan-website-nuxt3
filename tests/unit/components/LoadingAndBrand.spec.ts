import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Loading from '~/components/Loading/index.vue';
import LoadingPage from '~/components/Loading/Page.vue';
import Logo from '~/components/Logo/index.vue';
import LogoReverse from '~/components/Logo/Reverse.vue';

describe('Loading and Brand Components', () => {
  describe('Loading (Base)', () => {
    it('should render loading dots with default color', async () => {
      const wrapper = await mountSuspended(Loading);
      const dots = wrapper.findAll('span');
      expect(dots).toHaveLength(3);
      expect(dots[0].classes()).toContain('bg-white');
    });

    it('should apply custom color class', async () => {
      const wrapper = await mountSuspended(Loading, {
        props: { color: 'gold' },
      });
      const dots = wrapper.findAll('span');
      expect(dots[0].classes()).toContain('bg-gold');
    });
  });

  describe('LoadingPage', () => {
    it('should render loadMessage and Loading spinner', async () => {
      const wrapper = await mountSuspended(LoadingPage, {
        props: { loadMessage: 'Fetching articles...' },
      });

      expect(wrapper.text()).toContain('Fetching articles...');
      expect(wrapper.findComponent(Loading).exists()).toBe(true);
    });
  });

  describe('Logo', () => {
    it('should render logo image with correct alt attribute', async () => {
      const wrapper = await mountSuspended(Logo);
      const img = wrapper.find('img');
      expect(img.exists()).toBe(true);
      expect(img.attributes('alt')).toBe('Dragón Azul Logo');
    });
  });

  describe('LogoReverse', () => {
    it('should render flipped logo with -scale-x-100 class', async () => {
      const wrapper = await mountSuspended(LogoReverse);
      expect(wrapper.find('span').classes()).toContain('-scale-x-100');
      const img = wrapper.find('img');
      expect(img.exists()).toBe(true);
      expect(img.attributes('alt')).toBe('Dragón Azul Logo');
    });
  });
});
