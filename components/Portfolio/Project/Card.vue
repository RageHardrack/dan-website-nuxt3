<script setup lang="ts">
import { IProjectProperties } from "~~/interfaces";

interface Props {
  projectProps: IProjectProperties;
}

const { projectProps } = defineProps<Props>();
</script>

<template>
  <UICard :hasClick="true" :hasHover="true">
    <template #header></template>

    <template #content>
      <Heading2 customClass="text-gold">{{ projectProps.Name }}</Heading2>
    </template>

    <template #footer>
      <UIPill
        v-for="(name, idx) in projectProps.Tags"
        :key="idx"
        customClass="mr-2 mb-2"
      >
        {{ name }}
      </UIPill>
    </template>
  </UICard>
</template>
