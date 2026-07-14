<script setup lang="ts">
interface Props {
  customClass?: string;
}

const { customClass = "" } = defineProps<Props>();
</script>

<template>
  <h3 :class="`text-xl font-semibold font-sans leading-8 ${customClass || ''}`">
    <slot />
  </h3>
</template>
