<script setup lang="ts">
interface Props {
  customClass?: string;
}

defineProps<Props>();
</script>

<template>
  <span
    :class="`flex text-xs px-3 py-1 rounded-lg font-semibold bg-gold text-black-coffee ${
      customClass || ''
    }`"
  >
    <slot />
  </span>
</template>
