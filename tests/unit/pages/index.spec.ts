import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';

import IndexPage from '~/pages/index.vue';

describe('Index Page', () => {
  it('should render home landing page heading and author title', async () => {
    const wrapper = await mountSuspended(IndexPage);

    expect(wrapper.text()).toContain('Daniel Colmenares');
    expect(wrapper.text()).toContain('Esta página está en construcción...');
    expect(wrapper.text()).toContain('Última actualización:');
    expect(wrapper.find('a[href*="github.com"]').exists()).toBe(true);
  });

  it('should render article container with responsive flex layout classes', async () => {
    const wrapper = await mountSuspended(IndexPage);
    const article = wrapper.find('article');

    expect(article.classes()).toContain('flex-col-reverse');
    expect(article.classes()).toContain('md:flex-row');
  });
});
