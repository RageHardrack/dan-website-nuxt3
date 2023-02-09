import { ContentBlock } from "~~/interfaces";

export const blockContentAdapter = (block: ContentBlock) => ({
  type: block.type,
  body:
    block.type === "image"
      ? block[block.type].file.url
      : block[block.type].rich_text[0].plain_text,
  caption:
    block.type === "image"
      ? block[block.type].caption[0].plain_text
      : block[block.type].rich_text[0].plain_text,
  emoji: block.type === "callout" ? block[block.type].icon.emoji : null,
});
