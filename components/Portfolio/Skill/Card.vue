<script setup lang="ts">
import { ISkillProperties } from "~~/interfaces";

interface Props {
  skillProps: ISkillProperties;
}

const { skillProps } = defineProps<Props>();
</script>

<template>
  <article
    class="flex flex-col bg-secondary bg-opacity-30 justify-between overflow-hidden duration-300 transform rounded-lg shadow-lg hover:scale-105"
    :title="skillProps.Name"
  >
    <img
      :src="skillProps.Image_URL"
      :alt="skillProps.Name"
      class="aspect-square"
    />
  </article>
</template>
