<script setup lang="ts">
import { IProjectProperties } from "~~/interfaces";

interface Props {
  projectProps: IProjectProperties;
}

const target = ref();
const { isOutside } = useMouseInElement(target);

const { projectProps } = defineProps<Props>();
const { Name, Slug, Tags, Preview } = projectProps;
</script>

<template>
  <article
    class="relative flex flex-col justify-between space-y-2 overflow-hidden duration-300 transform rounded-lg shadow-lg cursor-pointer h-80 hover:scale-105"
    ref="target"
    @click="navigateTo(`/portfolio/projects/${Slug}`)"
  >
    <img
      :src="Preview"
      :alt="`${Name} preview`"
      class="object-cover w-full aspect-square"
      loading="lazy"
    />

    <transition-slide :offset="[0, '100%']">
      <footer
        v-if="!isOutside"
        class="absolute bottom-0 left-0 right-0 z-10 flex-col justify-start hidden gap-2 px-4 py-2 lg:flex h-1/3 bg-primary"
      >
        <Heading2 customClass="text-gold">{{ Name }}</Heading2>
        <section class="flex flex-wrap items-center justify-start gap-1">
          <Pill v-for="(name, idx) in Tags" :key="idx">
            {{ name }}
          </Pill>
        </section>
      </footer>
    </transition-slide>

    <footer
        class="absolute bottom-0 left-0 right-0 z-10 flex flex-col justify-start gap-1 px-4 py-2 lg:hidden h-2/5 bg-primary"
      >
        <Heading2 customClass="text-gold">{{ Name }}</Heading2>
        <section class="flex flex-wrap items-center justify-start gap-1">
          <Pill v-for="(name, idx) in Tags" :key="idx">
            {{ name }}
          </Pill>
        </section>
      </footer>
  </article>
</template>
