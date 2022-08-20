<script setup lang="ts">
import { BLOCK_ENUM } from "~~/constantes";
import { IPostBlock } from "~~/interfaces";

interface Props {
  content: IPostBlock[];
}

const { content } = defineProps<Props>();
</script>

<template>
  <article class="flex flex-col justify-start flex-1 space-y-4 text-justify">
    <template v-for="({ type, body, caption }, idx) in content" :key="idx">
      <!-- HEADERS -->
      <template v-if="type === 'heading_1'">
        <UIHeader as="h1">{{ body }}</UIHeader>
      </template>
      <template v-if="type === 'heading_2'">
        <UIHeader as="h2">{{ body }}</UIHeader>
      </template>
      <template v-if="type === 'heading_3'">
        <UIHeader as="h3">{{ body }}</UIHeader>
      </template>

      <!-- PARAGRAPH -->
      <template v-if="type === 'paragraph'">
        <p>{{ body }}</p>
      </template>

      <!-- LIST -->
      <template v-if="type === 'bulleted_list_item'">
        <ul class="list-disc list-inside">
          <li>{{ body }}</li>
        </ul>
      </template>
      <template v-if="type === 'numbered_list_item'">
        <ol class="list-decimal list-inside">
          <li>{{ body }}</li>
        </ol>
      </template>

      <!-- QUOTE -->
      <template v-if="type === 'quote'">
        <blockquote
          class="flex self-center w-auto max-w-md p-4 space-x-4 bg-gray-700 rounded-lg opacity-70"
        >
          <span class="block w-1 h-auto bg-white" />
          <span class="text-gray-300">
            {{ body }}
          </span>
        </blockquote>
      </template>

      <!-- CALLOUT -->
      <template v-if="type === 'callout'">
        <div
          class="flex self-center w-auto max-w-lg p-4 space-x-4 bg-gray-500 rounded-lg"
        >
          {{ body }}
        </div>
      </template>

      <!-- IMAGE -->
      <template v-if="type === 'image'">
        <div class="flex flex-col self-center space-y-2 aspect-square">
          <img :src="body" :alt="caption" class="w-96 h-96" />
          <p class="italic">{{ caption }}</p>
        </div>
      </template>
    </template>
  </article>
</template>
