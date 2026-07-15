import type { BlockType, RawContentBlock, ContentBlock } from '~/interfaces';

export const blockContentAdapter = (block: RawContentBlock): ContentBlock => {
  const type = block.type as BlockType;
  const rawBlock = block as any;

  return {
    object: block.object,
    id: block.id,
    type,
    body:
      block.type === 'image'
        ? rawBlock[block.type]?.file?.url || ''
        : rawBlock[block.type]?.rich_text?.[0]?.plain_text || '',
    caption:
      block.type === 'image'
        ? rawBlock[block.type]?.caption?.[0]?.plain_text || ''
        : rawBlock[block.type]?.rich_text?.[0]?.plain_text || '',
    emoji:
      block.type === 'callout'
        ? rawBlock[block.type]?.icon?.emoji || null
        : null,
  };
};
