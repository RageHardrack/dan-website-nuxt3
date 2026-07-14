<script setup lang="ts">
interface Props {
  customClass?: string;
}

const { customClass = "" } = defineProps<Props>();
</script>

<template>
  <h2
    :class="`text-xl sm:text-2xl font-semibold font-sans leading-8 ${
      customClass || ''
    }`"
  >
    <slot />
  </h2>
</template>
