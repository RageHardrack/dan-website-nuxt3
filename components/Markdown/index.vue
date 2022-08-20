<script setup lang="ts">
import { IPostBlock } from "~~/interfaces";

interface Props {
  content: IPostBlock[];
}

const { content } = defineProps<Props>();
</script>

<template>
  <article class="flex flex-col justify-start flex-1 space-y-4 text-justify">
    <template
      v-for="({ type, body, caption, emoji }, idx) in content"
      :key="idx"
    >
      <Heading1 v-if="type === 'heading_1'">{{ body }}</Heading1>
      <Heading2 v-else-if="type === 'heading_2'">{{ body }}</Heading2>
      <Heading3 v-else-if="type === 'heading_3'">{{ body }}</Heading3>

      <p v-else-if="type === 'paragraph'">{{ body }}</p>

      <ul
        v-else-if="type === 'bulleted_list_item'"
        class="list-disc list-inside"
      >
        <li>{{ body }}</li>
      </ul>
      <ol
        v-else-if="type === 'numbered_list_item'"
        class="list-decimal list-inside"
      >
        <li>{{ body }}</li>
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
        class="flex flex-col self-center space-y-2 aspect-square"
      >
        <img :src="body" :alt="caption" class="w-96 h-96" />
        <p class="italic">{{ caption }}</p>
      </picture>
    </template>
  </article>
</template>
