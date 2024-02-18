<script lang="ts" setup>
import type { IExperienceProperties } from "~/interfaces";

interface Props {
  xpProperties: IExperienceProperties;
}

const { xpProperties } = defineProps<Props>();
</script>

<template>
  <article class="relative flex flex-col gap-4 px-8 py-4 overflow-hidden rounded-lg bg-bone">
  <div class="absolute top-0 left-0 w-4 h-full bg-primary" />

    <header>
      <Heading3>
        {{ xpProperties.Work }}
      </Heading3>
      <p>{{ xpProperties.Period }}</p>
    </header>

    <p>{{ xpProperties.Description }}</p>

    <footer class="flex flex-wrap items-center justify-start gap-1">
      <Pill v-for="(name, idx) in xpProperties.Stack" :key="idx">
        {{ name }}
      </Pill>
    </footer>
  </article>
</template>
