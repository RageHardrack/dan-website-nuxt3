import { BlockType, RawContentBlock, ContentBlock } from "~~/interfaces";

export const blockContentAdapter = (block: RawContentBlock): ContentBlock => {
  const blockTypeIndex = BlockType[block.type as keyof typeof BlockType];

  return {
    object: block.object,
    id: block.id,
    type: blockTypeIndex,
    body:
      block.type === BlockType.IMAGE
        ? block[block.type].file.url
        : block[block.type].rich_text[0].plain_text,
    caption:
      block.type === BlockType.IMAGE
        ? block[block.type].caption[0].plain_text
        : block[block.type].rich_text[0].plain_text,
    emoji:
      block.type === BlockType.CALLOUT ? block[block.type].icon.emoji : null,
  };
};
