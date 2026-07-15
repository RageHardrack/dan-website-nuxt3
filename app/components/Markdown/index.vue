<script setup lang="ts">
import { computed } from 'vue';

import type { ContentBlock } from '~/interfaces';

interface Props {
  content: ContentBlock[];
}
const { content } = defineProps<Props>();

interface GroupedBlock {
  id: string;
  type: string;
  body?: string;
  items?: string[];
  caption?: string;
  emoji?: string | null;
}

const groupedContent = computed<GroupedBlock[]>(() => {
  const result: GroupedBlock[] = [];

  for (const block of content) {
    if (block.type === 'bulleted_list_item') {
      const lastBlock = result[result.length - 1];
      if (lastBlock && lastBlock.type === 'bulleted_list') {
        lastBlock.items?.push(block.body);
      } else {
        result.push({
          id: block.id,
          type: 'bulleted_list',
          items: [block.body],
        });
      }
    } else if (block.type === 'numbered_list_item') {
      const lastBlock = result[result.length - 1];
      if (lastBlock && lastBlock.type === 'numbered_list') {
        lastBlock.items?.push(block.body);
      } else {
        result.push({
          id: block.id,
          type: 'numbered_list',
          items: [block.body],
        });
      }
    } else {
      result.push({
        id: block.id,
        type: block.type,
        body: block.body,
        caption: block.caption,
        emoji: block.emoji,
      });
    }
  }

  return result;
});
</script>

<template>
  <article class="flex flex-col justify-start flex-1 space-y-4 text-justify">
    <template
      v-for="{ type, body, caption, emoji, items, id } in groupedContent"
      :key="id"
    >
      <Heading1 v-if="type === 'heading_1'">{{ body }}</Heading1>
      <Heading2 v-else-if="type === 'heading_2'">{{ body }}</Heading2>
      <Heading3 v-else-if="type === 'heading_3'">{{ body }}</Heading3>

      <p v-else-if="type === 'paragraph'">{{ body }}</p>

      <ul
        v-else-if="type === 'bulleted_list'"
        class="pl-4 list-disc list-inside space-y-1"
      >
        <li v-for="(item, i) in items" :key="i">{{ item }}</li>
      </ul>

      <ol
        v-else-if="type === 'numbered_list'"
        class="pl-4 list-decimal list-inside space-y-1"
      >
        <li v-for="(item, i) in items" :key="i">{{ item }}</li>
      </ol>

      <blockquote
        v-else-if="type === 'quote'"
        class="flex self-center w-auto max-w-md p-4 space-x-4 rounded-lg bg-secondary opacity-70"
      >
        <span class="block w-1 h-auto bg-white" />
        <span class="text-gray-300">
          {{ body }}
        </span>
      </blockquote>

      <div
        v-else-if="type === 'callout'"
        class="flex self-center w-auto max-w-lg p-4 space-x-4 rounded-lg bg-black-coffee text-bone"
      >
        {{ emoji }}
        {{ body }}
      </div>

      <picture
        v-else-if="type === 'image'"
        class="flex flex-col self-center space-y-2 overflow-hidden aspect-auto"
      >
        <img :src="body" :alt="caption" class="aspect-auto max-h-96" />
        <p class="italic">{{ caption }}</p>
      </picture>
    </template>
  </article>
</template>
