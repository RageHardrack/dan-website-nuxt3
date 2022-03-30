<script setup lang="ts">
import WideCard from "../../UI-kit/Cards/WideCard.vue";
import Header from "../../Typography/Header.vue";
import Pill from "../../UI-kit/Pills/Pill.vue";
import { PostProperties } from "~~/interfaces";
// import { DateTime } from "luxon";

interface Props {
  post: PostProperties;
}

const { post } = defineProps<Props>();

const { Image_URL, Tags, Fecha_Publicacion, Slug, Post, Brief } = post;
</script>

<template>
  <NuxtLink :to="`/blog/${Slug}`">
    <WideCard :isLink="true">
      <template #aside>
        <img
          :src="Image_URL"
          :alt="`${Post} cover`"
          class="object-cover w-full rounded-lg aspect-square"
        />
      </template>

      <template #header>
        <Pill v-for="(name, idx) in Tags" :key="idx" customClass="mr-2 mb-2">
          {{ name }}</Pill
        >
      </template>

      <template #content>
        <Header as="h2" customClass="text-gold">{{ Post }}</Header>
        <p class="text-black-coffee">{{ Brief }}</p>
      </template>

      <template #footer>
        <p class="text-black-coffee">Publicado el {{ Fecha_Publicacion }}</p>
      </template>
    </WideCard>
  </NuxtLink>
</template>
