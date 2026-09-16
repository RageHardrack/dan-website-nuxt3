<script setup lang="ts">
import type { IProjectProperties } from '~/interfaces';

interface Props {
  projectProps: IProjectProperties;
}

const { projectProps } = defineProps<Props>();
const { Name, Slug, Tags, Preview } = projectProps;
const localePath = useLocalePath();
</script>

<template>
  <NuxtLink
    :to="localePath(`/portfolio/projects/${Slug}`)"
    class="group relative flex flex-col justify-between space-y-2 overflow-hidden duration-300 transform rounded-lg shadow-lg cursor-pointer h-80 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
  >
    <img
      :src="Preview"
      :alt="`${Name} preview`"
      class="object-cover w-full aspect-square"
      loading="lazy"
    />

    <footer
      class="absolute bottom-0 left-0 right-0 z-10 flex flex-col justify-start gap-1.5 px-4 py-2 bg-primary transition-transform duration-300 ease-out h-2/5 lg:h-1/3 lg:translate-y-full lg:group-hover:translate-y-0 lg:group-focus-within:translate-y-0"
    >
      <Heading2 customClass="text-gold">{{ Name }}</Heading2>
      <section class="flex flex-wrap items-center justify-start gap-1">
        <Pill v-for="(name, idx) in Tags" :key="idx">
          {{ name }}
        </Pill>
      </section>
    </footer>
  </NuxtLink>
</template>
