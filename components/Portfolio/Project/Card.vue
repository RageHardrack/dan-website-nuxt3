<script setup lang="ts">
import { IProjectProperties } from "~~/interfaces";

interface Props {
  projectProps: IProjectProperties;
}

const { projectProps } = defineProps<Props>();
const { Name, Slug, Tags, Preview } = projectProps;
</script>

<template>
  <UICard
    :hasClick="true"
    :hasHover="true"
    @click="navigateTo(`/portfolio/projects/${Slug}`)"
  >
    <template #header>
      <img
        :src="Preview"
        :alt="`${Name} preview`"
        class="absolute top-0 left-0 right-0 w-full"
      />
    </template>

    <template #content>
      <Heading2 customClass="text-gold">{{ Name }}</Heading2>
    </template>

    <template #footer>
      <UIPill v-for="(name, idx) in Tags" :key="idx" customClass="mr-1 mb-1">
        {{ name }}
      </UIPill>
    </template>
  </UICard>
</template>
