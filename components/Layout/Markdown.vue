<script setup lang="ts">
import { BLOCK_ENUM } from "~~/constantes";
import { IPostBlock } from "~~/interfaces";
import Header from "../Typography/Header.vue";

interface Props {
  item: IPostBlock;
}

const { item } = defineProps<Props>();

const { type, body, caption } = item;
</script>

<template>
  <!-- HEADERS -->
  <Header v-if="type === 'heading_1'" as="h1">{{ body }}</Header>
  <Header v-if="type === 'heading_2'" as="h1">{{ body }}</Header>
  <Header v-if="type === 'heading_3'" as="h1">{{ body }}</Header>

  <!-- PARAGRAPH -->
  <p v-if="type === 'paragraph'">{{ body }}</p>

  <!-- LIST -->
  <ul v-if="type === 'bulleted_list_item'" class="list-disc list-inside">
    <li>{{ body }}</li>
  </ul>
  <ol v-if="type === 'numbered_list_item'" class="list-decimal list-inside">
    <li>{{ body }}</li>
  </ol>

  <!-- QUOTE -->
  <blockquote
    v-if="type === 'quote'"
    class="flex self-center w-auto max-w-md p-4 space-x-4 bg-gray-700 rounded-lg opacity-70"
  >
    <span class="block w-1 h-auto bg-white" />
    <span class="text-gray-300">
      {{ body }}
    </span>
  </blockquote>

  <!-- CALLOUT -->
  <div
    v-if="type === 'callout'"
    class="flex self-center w-auto max-w-lg p-4 space-x-4 bg-gray-500 rounded-lg"
  >
    {{ body }}
  </div>

  <!-- IMAGE -->
  <div
    v-if="type === 'image'"
    class="flex flex-col self-center space-y-2 aspect-square"
  >
    <img :src="body" :alt="caption" class="w-96 h-96" />
    <p class="italic">{{ caption }}</p>
  </div>
</template>
