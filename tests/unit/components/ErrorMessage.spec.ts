import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';

import ErrorMessage from '~/components/ErrorMessage.vue';

describe('ErrorMessage Component', () => {
  it('should render default error message and retry button when no props are provided', async () => {
    const wrapper = await mountSuspended(ErrorMessage);

    expect(wrapper.find('[role="alert"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Ocurrió un error al cargar los datos.');
    expect(wrapper.find('button').text()).toBe('Reintentar');
  });

  it('should render custom message and retry button text when props are passed', async () => {
    const wrapper = await mountSuspended(ErrorMessage, {
      props: {
        message: 'Could not fetch portfolio items.',
        retryText: 'Try Again',
      },
    });

    expect(wrapper.text()).toContain('Could not fetch portfolio items.');
    expect(wrapper.find('button').text()).toBe('Try Again');
  });

  it('should emit retry event when retry button is clicked', async () => {
    const wrapper = await mountSuspended(ErrorMessage);

    const button = wrapper.find('button');
    await button.trigger('click');
    await button.trigger('click');

    expect(wrapper.emitted('retry')).toBeTruthy();
    expect(wrapper.emitted('retry')?.length).toBe(2);
  });

  it('should have accessible alert and button attributes', async () => {
    const wrapper = await mountSuspended(ErrorMessage);

    const alertEl = wrapper.find('[role="alert"]');
    expect(alertEl.attributes('aria-live')).toBe('polite');
    const button = wrapper.find('button');
    expect(button.attributes('type')).toBe('button');
  });
});
