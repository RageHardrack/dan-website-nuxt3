<script setup lang="ts">
interface Props {
  enlace: string;
}

const { enlace } = defineProps<Props>();
</script>

<template>
  <li
    class="flex items-center justify-center w-full px-6 py-2 transition-opacity duration-300 rounded-lg cursor-pointer bg-electric text-bone md:w-1/4 hover:opacity-95"
  >
    <a :href="enlace" target="_blank" rel="nofollow">
      <slot />
    </a>
  </li>
</template>
