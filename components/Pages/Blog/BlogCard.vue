<script setup lang="ts">
import BaseCard from "~~/components/UI-kit/Cards/BaseCard.vue";
import Header from "~~/components/Typography/Header.vue";
import Pill from "~~/components/UI-kit/Pills/Pill.vue";
import { PostProperties } from "~~/interfaces";

interface Props {
  post: PostProperties;
}

const { post } = defineProps<Props>();

const { Image_URL, Tags, Fecha_Publicacion, Slug, Post, Brief } = post;
</script>

<template>
  <NuxtLink :to="`/blog/${Slug}`">
    <BaseCard :isLink="true">
      <template #header>
        <img :src="Image_URL" :alt="`${Post} cover`" class="aspect-square" />
      </template>

      <template #content>
        <Header as="h2" customClass="text-gold">{{ Post }}</Header>
        <p class="text-gray-400">Publicado el {{ Fecha_Publicacion }}</p>
        <p class="text-bone">{{ Brief }}</p>
      </template>

      <template #footer>
        <Pill v-for="(name, idx) in Tags" :key="idx" customClass="mr-2 mb-2">
          {{ name }}</Pill
        >
      </template>
    </BaseCard>
  </NuxtLink>
</template>
