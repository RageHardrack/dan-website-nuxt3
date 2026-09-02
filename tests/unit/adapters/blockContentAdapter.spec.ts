import { describe, it, expect } from 'vitest';
import { blockContentAdapter } from '~/adapters/blockContentAdapter';
import type { RawContentBlock } from '~/interfaces';

describe('blockContentAdapter', () => {
  it('should adapt paragraph block correctly', () => {
    const raw: RawContentBlock = {
      object: 'block',
      id: 'block-1',
      parent: {} as any,
      created_time: '2024-01-01',
      last_edited_time: '2024-01-02',
      created_by: {} as any,
      last_edited_by: {} as any,
      has_children: false,
      archived: false,
      type: 'paragraph',
      child_database: { title: '' },
      paragraph: {
        rich_text: [{ plain_text: 'Hello world paragraph content' }],
      },
    };

    const result = blockContentAdapter(raw);
    expect(result).toEqual({
      object: 'block',
      id: 'block-1',
      type: 'paragraph',
      body: 'Hello world paragraph content',
      caption: 'Hello world paragraph content',
      emoji: null,
    });
  });

  it('should adapt image block with file url and caption', () => {
    const raw: RawContentBlock = {
      object: 'block',
      id: 'block-image',
      parent: {} as any,
      created_time: '2024-01-01',
      last_edited_time: '2024-01-02',
      created_by: {} as any,
      last_edited_by: {} as any,
      has_children: false,
      archived: false,
      type: 'image',
      child_database: { title: '' },
      image: {
        file: { url: 'https://cdn.image.com/pic.png' },
        caption: [{ plain_text: 'Image caption' }],
      },
    };

    const result = blockContentAdapter(raw);
    expect(result).toEqual({
      object: 'block',
      id: 'block-image',
      type: 'image',
      body: 'https://cdn.image.com/pic.png',
      caption: 'Image caption',
      emoji: null,
    });
  });

  it('should adapt callout block with emoji icon', () => {
    const raw = {
      object: 'block',
      id: 'block-callout',
      parent: {},
      created_time: '2024-01-01',
      last_edited_time: '2024-01-02',
      created_by: {},
      last_edited_by: {},
      has_children: false,
      archived: false,
      type: 'callout',
      child_database: { title: '' },
      callout: {
        icon: { emoji: '💡' },
        rich_text: [{ plain_text: 'Important note' }],
      },
    } as unknown as RawContentBlock;

    const result = blockContentAdapter(raw);
    expect(result).toEqual({
      object: 'block',
      id: 'block-callout',
      type: 'callout',
      body: 'Important note',
      caption: 'Important note',
      emoji: '💡',
    });
  });

  it('should handle missing nested properties gracefully', () => {
    const raw = {
      object: 'block',
      id: 'block-empty',
      type: 'image',
    } as unknown as RawContentBlock;

    const result = blockContentAdapter(raw);
    expect(result).toEqual({
      object: 'block',
      id: 'block-empty',
      type: 'image',
      body: '',
      caption: '',
      emoji: null,
    });
  });
});
