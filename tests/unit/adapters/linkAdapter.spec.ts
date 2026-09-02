import { describe, it, expect } from 'vitest';
import { linkPropertiesAdapter, linkAdapter } from '~/adapters/linkAdapter';
import type { LinkNotionResponseProperties, LinkNotionResponse } from '~/interfaces';

describe('linkAdapter', () => {
  const mockProperties: LinkNotionResponseProperties = {
    Link: {
      id: 'link-url-id',
      type: 'url',
      url: 'https://github.com/danielcolmenares',
    },
    Orden: {
      id: 'order-id',
      type: 'number',
      number: 1,
    },
    Name: {
      id: 'name-id',
      type: 'title',
      title: [{ plain_text: 'GitHub Profile' } as any],
    },
    Display: {
      id: 'display-id',
      type: 'checkbox',
      checkbox: true,
    },
    Stage: {
      id: 'stage-id',
      type: 'relation',
      relation: [{ id: 'stage-456' }],
    },
  };

  it('should adapt LinkNotionResponseProperties correctly', () => {
    const result = linkPropertiesAdapter(mockProperties);
    expect(result).toEqual({
      Link: 'https://github.com/danielcolmenares',
      Orden: 1,
      Name: 'GitHub Profile',
      Display: true,
      Stage: 'stage-456',
    });
  });

  it('should fallback Stage to empty string when relation is empty', () => {
    const propsWithoutRelation: LinkNotionResponseProperties = {
      ...mockProperties,
      Stage: {
        id: 'stage-id',
        type: 'relation',
        relation: [],
      },
    };

    const result = linkPropertiesAdapter(propsWithoutRelation);
    expect(result.Stage).toBe('');
  });

  it('should adapt an array of LinkNotionResponse into ILink[]', () => {
    const rawLinks: LinkNotionResponse[] = [
      {
        id: 'link-item-1',
        properties: mockProperties,
      } as any,
    ];

    const result = linkAdapter(rawLinks);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('link-item-1');
    expect(result[0].Name).toBe('GitHub Profile');
    expect(result[0].Link).toBe('https://github.com/danielcolmenares');
    expect(result[0].Display).toBe(true);
  });
});
