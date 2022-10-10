<script setup lang="ts">
import { ISkillProperties } from "~~/interfaces";

interface Props {
  skillProps: ISkillProperties;
}

const { skillProps } = defineProps<Props>();
</script>

<template>
  <article
    class="flex flex-col justify-between overflow-hidden duration-300 transform rounded-lg shadow-lg bg-secondary bg-opacity-30 hover:scale-105"
    :title="skillProps.Name"
    v-motion-slide-left
  >
    <img
      :src="skillProps.Image_URL"
      :alt="skillProps.Name"
      class="aspect-square"
    />
  </article>
</template>
