<script setup lang="ts">
import { IPostProperties } from "~~/interfaces";
import dayjs from "dayjs";

interface Props {
  post: IPostProperties;
}

const { post } = defineProps<Props>();

const { Image_URL, Tags, Fecha_Publicacion, Slug, Post, Brief } = post;
</script>

<template>
  <NuxtLink :to="`/blog/${Slug}`">
    <UICardWide :isLink="true">
      <template #aside>
        <img
          :src="Image_URL"
          :alt="`${Post} cover`"
          class="object-cover w-full rounded-lg aspect-square"
        />
      </template>

      <template #header>
        <UIPill v-for="(name, idx) in Tags" :key="idx" customClass="mr-2 mb-2">
          {{ name }}</UIPill
        >
      </template>

      <template #content>
        <Heading2 customClass="text-gold">{{ Post }}</Heading2>
        <p class="text-black-coffee">{{ Brief }}</p>
      </template>

      <template #footer>
        <p class="text-black-coffee">
          {{ dayjs(Fecha_Publicacion).format("DD MMMM YYYY") }}
        </p>
      </template>
    </UICardWide>
  </NuxtLink>
</template>
