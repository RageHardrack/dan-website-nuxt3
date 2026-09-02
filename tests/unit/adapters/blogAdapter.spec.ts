import { describe, it, expect } from 'vitest';
import { postPropertiesAdapter, postAdapter } from '~/adapters/blogAdapter';
import type { PostNotionResponseProperties, PostNotionResponse } from '~/interfaces';

describe('blogAdapter', () => {
  const mockProperties: PostNotionResponseProperties = {
    Tags: {
      id: 'tags-id',
      type: 'multi_select',
      multi_select: [{ id: '1', name: 'TypeScript', color: 'blue' }, { id: '2', name: 'Nuxt', color: 'green' }],
    },
    Image_URL: {
      id: 'img-id',
      type: 'url',
      url: 'https://example.com/thumb.jpg',
    },
    Status: {
      id: 'status-id',
      type: 'select',
      select: { id: '1', name: 'Published', color: 'green' },
    },
    Slug: {
      id: 'slug-id',
      type: 'rich_text',
      rich_text: [{ plain_text: 'my-first-post' } as any],
    },
    Fecha_Publicacion: {
      id: 'date-id',
      type: 'date',
      date: { start: '2024-05-10', end: null, time_zone: null },
    },
    Brief: {
      id: 'brief-id',
      type: 'rich_text',
      rich_text: [{ plain_text: 'A brief description of the post.' } as any],
    },
    Post: {
      id: 'post-id',
      type: 'title',
      title: [{ plain_text: 'My First Post' } as any],
    },
    Prevent_Index: {
      id: 'index-id',
      type: 'checkbox',
      checkbox: false,
    },
    Language: {
      id: 'lang-id',
      type: 'select',
      select: { id: '1', name: 'en', color: 'blue' },
    },
    Stage: {
      id: 'stage-id',
      type: 'relation',
      relation: [{ id: 'rel-123' }],
    },
  };

  it('should adapt PostNotionResponseProperties correctly', () => {
    const result = postPropertiesAdapter(mockProperties);
    expect(result).toEqual({
      Tags: ['TypeScript', 'Nuxt'],
      Image_URL: 'https://example.com/thumb.jpg',
      Status: 'Published',
      Slug: 'my-first-post',
      Fecha_Publicacion: '2024-05-10',
      Brief: 'A brief description of the post.',
      Post: 'My First Post',
      Prevent_Index: false,
      Language: 'en',
      Stage: 'rel-123',
    });
  });

  it('should fallback Stage to empty string when relation is empty', () => {
    const propsWithoutRelation: PostNotionResponseProperties = {
      ...mockProperties,
      Stage: {
        id: 'stage-id',
        type: 'relation',
        relation: [],
      },
    };

    const result = postPropertiesAdapter(propsWithoutRelation);
    expect(result.Stage).toBe('');
  });

  it('should adapt an array of PostNotionResponse into IPost[]', () => {
    const rawPosts: PostNotionResponse[] = [
      {
        id: 'post-1',
        properties: mockProperties,
      } as any,
    ];

    const result = postAdapter(rawPosts);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('post-1');
    expect(result[0].Post).toBe('My First Post');
    expect(result[0].Slug).toBe('my-first-post');
  });
});
