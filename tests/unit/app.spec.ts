import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import App from '~/app.vue';

describe('Root App Component', () => {
  it('should render root app component with Nuxt layout and pages', async () => {
    const wrapper = await mountSuspended(App);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('section').exists()).toBe(true);
  });
});
