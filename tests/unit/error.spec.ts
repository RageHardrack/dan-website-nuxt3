import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import ErrorPage from '~/error.vue';

const { mockClearError } = vi.hoisted(() => ({
  mockClearError: vi.fn(),
}));

mockNuxtImport('clearError', () => mockClearError);

describe('error.vue', () => {
  beforeEach(() => {
    mockClearError.mockReset();
  });

  it('should render 404 error page details', async () => {
    const mockError = {
      statusCode: 404,
      statusMessage: 'Page Not Found',
      message: 'The requested resource was not found.',
      url: '/not-found',
    } as any;

    const wrapper = await mountSuspended(ErrorPage, {
      props: { error: mockError },
    });

    expect(wrapper.find('h1').text()).toBe('404');
    expect(wrapper.find('h2').text()).toBe('Page Not Found');
    expect(wrapper.text()).toContain('Page Not Found');
  });

  it('should render 500 error page details for server errors', async () => {
    const mockError = {
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Server crashed unexpectedly.',
      url: '/crash',
    } as any;

    const wrapper = await mountSuspended(ErrorPage, {
      props: { error: mockError },
    });

    expect(wrapper.find('h1').text()).toBe('500');
    expect(wrapper.find('h2').text()).toBe('Something went wrong');
    expect(wrapper.text()).toContain('Internal Server Error');
  });

  it('should render default fallback status and message when omitted', async () => {
    const mockError = {} as any;

    const wrapper = await mountSuspended(ErrorPage, {
      props: { error: mockError },
    });

    expect(wrapper.find('h1').text()).toBe('500');
    expect(wrapper.find('h2').text()).toBe('Something went wrong');
    expect(wrapper.text()).toContain('An unexpected error occurred while loading this page.');
  });

  it('should trigger clearError with redirect to / when clicking button', async () => {
    const mockError = {
      statusCode: 404,
      statusMessage: 'Not Found',
    } as any;

    const wrapper = await mountSuspended(ErrorPage, {
      props: { error: mockError },
    });

    const button = wrapper.find('button');
    await button.trigger('click');

    expect(mockClearError).toHaveBeenCalledWith({ redirect: '/' });
  });
});
