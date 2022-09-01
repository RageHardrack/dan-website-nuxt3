<script setup lang="ts">
import { IProjectProperties } from "~~/interfaces";

interface Props {
  projectProps: IProjectProperties;
}

const { projectProps } = defineProps<Props>();
const { Name, Slug, Tags, Preview } = projectProps;
</script>

<template>
  <NuxtLink :to="`/portfolio/projects/${Slug}`">
    <UICard :hasClick="true" :hasHover="true">
      <template #header>
        <img :src="Preview" :alt="`${Name} preview`" class="aspect-video" />
      </template>

      <template #content>
        <Heading2 customClass="text-gold">{{ Name }}</Heading2>
      </template>

      <template #footer>
        <UIPill v-for="(name, idx) in Tags" :key="idx" customClass="mr-2 mb-2">
          {{ name }}
        </UIPill>
      </template>
    </UICard>
  </NuxtLink>
</template>
