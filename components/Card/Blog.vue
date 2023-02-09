<script setup lang="ts">
import { IPost } from "~~/interfaces";

interface Props {
  post: IPost;
}

const { post } = defineProps<Props>();

const { Image_URL, Tags, Fecha_Publicacion, Slug, Post, Brief } = post;
</script>

<template>
  <NuxtLink :to="`/blog/${Slug}`">
    <Card :hasClick="true" :hasHover="true">
      <template #header>
        <img :src="Image_URL" :alt="`${Post} cover`" class="aspect-square" />
      </template>

      <template #content>
        <Heading2 customClass="text-gold">{{ Post }}</Heading2>
        <p class="text-gray-400">{{ $dayjs(Fecha_Publicacion).format("DD MMMM YYYY") }}</p>
        <p class="text-bone">{{ Brief }}</p>
      </template>

      <template #footer>
        <Pill v-for="(name, idx) in Tags" :key="idx" customClass="mr-2 mb-2">
          {{ name }}
        </Pill>
      </template>
    </Card>
  </NuxtLink>
</template>
