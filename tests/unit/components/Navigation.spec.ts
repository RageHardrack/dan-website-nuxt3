import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Navbar from '~/components/Navbar.vue';
import SideNav from '~/components/SideNav.vue';
import Footer from '~/components/Footer.vue';
import { useUIStore } from '~/stores/useUIStore';

describe('Navigation Components', () => {
  describe('Navbar', () => {
    it('should render navigation links and brand logo', async () => {
      const wrapper = await mountSuspended(Navbar);

      expect(wrapper.text()).toContain('Blog');
      expect(wrapper.text()).toContain('About');
      expect(wrapper.text()).toContain('Portfolio');
      expect(wrapper.findComponent({ name: 'LogoReverse' }).exists()).toBe(true);
    });

    it('should trigger toggleSideNav on mobile menu button click', async () => {
      const store = useUIStore();
      const initial = store.showSideBar;
      const wrapper = await mountSuspended(Navbar);

      const menuBtn = wrapper.findComponent({ name: 'ButtonMenu' });
      if (menuBtn.exists()) {
        await menuBtn.find('button').trigger('click');
        expect(store.showSideBar).toBe(!initial);
      }
    });
  });

  describe('SideNav', () => {
    it('should render mobile navigation items and trigger toggleSideNav on close or link click', async () => {
      const store = useUIStore();
      store.showSideBar = true;

      const wrapper = await mountSuspended(SideNav);
      expect(wrapper.text()).toContain('Dan Colmenares');
      expect(wrapper.text()).toContain('Blog');
      expect(wrapper.text()).toContain('About');
      expect(wrapper.text()).toContain('Portfolio');

      const closeButton = wrapper.find('button');
      expect(closeButton.exists()).toBe(true);
      await closeButton.trigger('click');
      expect(store.showSideBar).toBe(false);
    });
  });

  describe('Footer', () => {
    it('should render author credit and social media links', async () => {
      const wrapper = await mountSuspended(Footer);

      expect(wrapper.text()).toContain('Created by');
      expect(wrapper.text()).toContain('Daniel Colmenares');

      const links = wrapper.findAll('a');
      expect(links.length).toBeGreaterThan(0);
      const repoLink = wrapper.find('a[href*="dan-website-nuxt3"]');
      expect(repoLink.exists()).toBe(true);
    });
  });
});
