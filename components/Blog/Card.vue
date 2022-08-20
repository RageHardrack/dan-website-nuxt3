<script setup lang="ts">
import { IPostProperties } from "~~/interfaces";

interface Props {
  post: IPostProperties;
}

const { post } = defineProps<Props>();

const { Image_URL, Tags, Fecha_Publicacion, Slug, Post, Brief } = post;
</script>

<template>
  <NuxtLink :to="`/blog/${Slug}`">
    <UICardBase :isLink="true">
      <template #header>
        <img :src="Image_URL" :alt="`${Post} cover`" class="aspect-square" />
      </template>

      <template #content>
        <Heading2 customClass="text-gold">{{ Post }}</Heading2>
        <p class="text-gray-400">Publicado el {{ Fecha_Publicacion }}</p>
        <p class="text-bone">{{ Brief }}</p>
      </template>

      <template #footer>
        <UIPill v-for="(name, idx) in Tags" :key="idx" customClass="mr-2 mb-2">
          {{ name }}</UIPill
        >
      </template>
    </UICardBase>
  </NuxtLink>
</template>
