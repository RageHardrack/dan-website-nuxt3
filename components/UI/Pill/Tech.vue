<script setup lang="ts">
import { TechTag } from "~~/interfaces";

interface Props {
  techTag: TechTag;
  customClass?: string;
}

const { techTag } = defineProps<Props>();

const colorsTags = {
  VueJS: "#41B883",
  ReactJS: "#61DBFB",
  NextJS: "#000",
  NuxtJS: "#35495e",
  //    "Frontend":,
  //    "Backend":,
  //    "TailwindCSS":,
  //    "Typescript":,
  //    "Strapi":,
  //    "Pinia":,
  //    "Sequelize":,
  //    "PWA":,
};

const colorTag = computed(() => `bg-[${colorsTags[techTag]}]`);
console.log({ colorTag: colorsTags[techTag] });
</script>

<template>
  <span
    class="flex text-sm px-3 py-1 rounded-lg font-semibold text-black-coffee"
    :class="`${colorTag} ${customClass || ''}`"
  >
    <slot />
  </span>
</template>
