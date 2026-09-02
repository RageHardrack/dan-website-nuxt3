import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Markdown from '~/components/Markdown/index.vue';
import type { ContentBlock } from '~/interfaces';

describe('Markdown Component', () => {
  it('should render empty without content or non-array content', async () => {
    const wrapperEmpty = await mountSuspended(Markdown, {
      props: {
        content: [],
      },
    });
    expect(wrapperEmpty.find('article').exists()).toBe(true);
    expect(wrapperEmpty.text()).toBe('');

    const wrapperUndefined = await mountSuspended(Markdown, {
      props: {
        content: null as any,
      },
    });
    expect(wrapperUndefined.text()).toBe('');
  });

  it('should filter out null or undefined blocks gracefully', async () => {
    const content = [
      null,
      undefined,
      { id: '1', type: 'paragraph', body: 'Valid line', caption: '', emoji: null, object: 'block' },
    ] as any;

    const wrapper = await mountSuspended(Markdown, {
      props: { content },
    });

    expect(wrapper.text()).toBe('Valid line');
  });

  it('should render headings correctly', async () => {
    const content: ContentBlock[] = [
      { id: '1', type: 'heading_1', body: 'Title 1', caption: '', emoji: null, object: 'block' },
      { id: '2', type: 'heading_2', body: 'Title 2', caption: '', emoji: null, object: 'block' },
      { id: '3', type: 'heading_3', body: 'Title 3', caption: '', emoji: null, object: 'block' },
    ];

    const wrapper = await mountSuspended(Markdown, {
      props: { content },
    });

    expect(wrapper.text()).toContain('Title 1');
    expect(wrapper.text()).toContain('Title 2');
    expect(wrapper.text()).toContain('Title 3');
  });

  it('should group bulleted list items and numbered list items', async () => {
    const content: ContentBlock[] = [
      { id: 'b1', type: 'bulleted_list_item', body: 'Item A', caption: '', emoji: null, object: 'block' },
      { id: 'b2', type: 'bulleted_list_item', body: 'Item B', caption: '', emoji: null, object: 'block' },
      { id: 'p1', type: 'paragraph', body: 'A middle paragraph', caption: '', emoji: null, object: 'block' },
      { id: 'n1', type: 'numbered_list_item', body: 'Step 1', caption: '', emoji: null, object: 'block' },
      { id: 'n2', type: 'numbered_list_item', body: 'Step 2', caption: '', emoji: null, object: 'block' },
    ];

    const wrapper = await mountSuspended(Markdown, {
      props: { content },
    });

    const ul = wrapper.find('ul');
    expect(ul.exists()).toBe(true);
    expect(ul.findAll('li')).toHaveLength(2);
    expect(ul.text()).toContain('Item A');
    expect(ul.text()).toContain('Item B');

    expect(wrapper.find('p').text()).toBe('A middle paragraph');

    const ol = wrapper.find('ol');
    expect(ol.exists()).toBe(true);
    expect(ol.findAll('li')).toHaveLength(2);
    expect(ol.text()).toContain('Step 1');
    expect(ol.text()).toContain('Step 2');
  });

  it('should render quotes, callouts, and images', async () => {
    const content: ContentBlock[] = [
      { id: 'q1', type: 'quote', body: 'Wise quote', caption: '', emoji: null, object: 'block' },
      { id: 'c1', type: 'callout', body: 'Notice note', caption: '', emoji: '🚀', object: 'block' },
      { id: 'i1', type: 'image', body: 'https://cdn.example.com/img.png', caption: 'Sample photo', emoji: null, object: 'block' },
    ];

    const wrapper = await mountSuspended(Markdown, {
      props: { content },
    });

    expect(wrapper.find('blockquote').text()).toContain('Wise quote');
    expect(wrapper.text()).toContain('🚀');
    expect(wrapper.text()).toContain('Notice note');

    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe('https://cdn.example.com/img.png');
    expect(img.attributes('alt')).toBe('Sample photo');
  });
});
