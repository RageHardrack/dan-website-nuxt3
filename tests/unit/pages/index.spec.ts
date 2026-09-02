import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import IndexPage from '~/pages/index.vue';

describe('Index Page', () => {
  it('should render home landing page heading and author title', async () => {
    const wrapper = await mountSuspended(IndexPage);

    expect(wrapper.text()).toContain('Daniel Colmenares');
    expect(wrapper.text()).toContain('This page is under Construction...');
    expect(wrapper.text()).toContain('Last Update:');
    expect(wrapper.find('a[href*="github.com"]').exists()).toBe(true);
  });
});
