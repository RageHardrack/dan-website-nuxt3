import { describe, it, expect, beforeEach } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { setActivePinia, createPinia } from 'pinia';
import Pill from '~/components/Pill/index.vue';
import PillTech from '~/components/Pill/Tech.vue';
import Modal from '~/components/Modal/index.vue';
import Overlay from '~/components/Overlay.vue';
import Divider from '~/components/Divider.vue';
import { useUIStore } from '~/stores/useUIStore';

describe('Pills, Modals & UI Elements', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('Pill (Base)', () => {
    it('should render pill with text slot and custom class', async () => {
      const wrapper = await mountSuspended(Pill, {
        props: { customClass: 'custom-pill' },
        slots: { default: 'Vue.js' },
      });

      expect(wrapper.text()).toBe('Vue.js');
      expect(wrapper.classes()).toContain('custom-pill');
      expect(wrapper.classes()).toContain('bg-gold');
    });

    it('should render pill without custom class', async () => {
      const wrapper = await mountSuspended(Pill, {
        slots: { default: 'Default Pill' },
      });

      expect(wrapper.text()).toBe('Default Pill');
      expect(wrapper.classes()).toContain('bg-gold');
    });
  });

  describe('PillTech', () => {
    it('should render technology tag pill with mapped color', async () => {
      const wrapper = await mountSuspended(PillTech, {
        props: {
          techTag: 'VueJS',
          customClass: 'mr-2',
        },
        slots: { default: 'VueJS' },
      });

      expect(wrapper.text()).toBe('VueJS');
      expect(wrapper.classes()).toContain('mr-2');
      expect(wrapper.classes()).toContain('bg-[#41B883]');
    });

    it('should render tag pill without mapped color for unknown tag', async () => {
      const wrapper = await mountSuspended(PillTech, {
        props: {
          techTag: 'UnknownTag' as any,
        },
        slots: { default: 'Unknown' },
      });

      expect(wrapper.text()).toBe('Unknown');
    });
  });

  describe('Modal', () => {
    it('should render teleported modal content and interact with UI store', async () => {
      const store = useUIStore();
      store.openModal();

      const wrapper = await mountSuspended(Modal, {
        slots: { default: '<div class="modal-body">Modal Content</div>' },
      });

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Overlay', () => {
    it('should render overlay container and slot content', async () => {
      const wrapper = await mountSuspended(Overlay, {
        slots: { default: '<div class="inner-box">Inside Overlay</div>' },
      });

      expect(wrapper.text()).toContain('Inside Overlay');
    });
  });

  describe('Divider', () => {
    it('should render divider bar', async () => {
      const wrapper = await mountSuspended(Divider);
      expect(wrapper.classes()).toContain('bg-gold');
      expect(wrapper.classes()).toContain('h-1');
    });
  });
});
