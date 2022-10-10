<script setup lang="ts">
import { IPostProperties } from "~~/interfaces";
const { $dayjs } = useNuxtApp();

interface Props {
  post: IPostProperties;
}

const { post } = defineProps<Props>();

const { Image_URL, Tags, Fecha_Publicacion, Slug, Post, Brief } = post;
</script>

<template>
  <NuxtLink :to="`/blog/${Slug}`">
    <CardWide :isLink="true">
      <template #aside>
        <img
          :src="Image_URL"
          :alt="`${Post} cover`"
          class="object-cover w-full rounded-lg aspect-square"
        />
      </template>

      <template #header>
        <Pill v-for="(name, idx) in Tags" :key="idx" customClass="mr-2 mb-2">
          {{ name }}
        </Pill>
      </template>

      <template #content>
        <Heading2 customClass="text-gold">{{ Post }}</Heading2>
        <p class="text-black-coffee">{{ Brief }}</p>
      </template>

      <template #footer>
        <p class="text-black-coffee">
          {{ $dayjs(Fecha_Publicacion).format("DD MMMM YYYY") }}
        </p>
      </template>
    </CardWide>
  </NuxtLink>
</template>
