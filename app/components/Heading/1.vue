<script setup lang="ts">
interface Props {
  customClass?: string;
}

const { customClass = "" } = defineProps<Props>();
</script>

<template>
  <h1 :class="`text-3xl font-bold font-sans leading-8 ${customClass}`">
    <slot />
  </h1>
</template>
