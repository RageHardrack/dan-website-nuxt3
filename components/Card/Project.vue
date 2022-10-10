<script setup lang="ts">
import { IProjectProperties } from "~~/interfaces";

interface Props {
  projectProps: IProjectProperties;
}

const { projectProps } = defineProps<Props>();
const { Name, Slug, Tags, Preview } = projectProps;
</script>

<template>
  <article
    class="flex flex-col justify-between space-y-2 overflow-hidden duration-300 transform rounded-lg shadow-lg cursor-pointer h-80 bg-primary hover:scale-110"
    :hasClick="true"
    :hasHover="true"
    @click="navigateTo(`/portfolio/projects/${Slug}`)"
    v-motion-slide-right
  >
    <header class="relative overflow-hidden h-3/5">
      <img
        :src="Preview"
        :alt="`${Name} preview`"
        class="absolute top-0 left-0 right-0 w-full"
      />
    </header>

    <section class="flex flex-col p-4 space-y-2 h-1/5">
      <Heading2 customClass="text-gold">{{ Name }}</Heading2>
    </section>

    <footer class="flex flex-wrap items-center justify-start p-4 h-1/5">
      <Pill v-for="(name, idx) in Tags" :key="idx" customClass="mr-1 mb-1">
        {{ name }}
      </Pill>
    </footer>
  </article>
</template>
