<script lang="ts" setup>
interface Props {
  url: string;
}

const { url } = defineProps<Props>();
</script>

<template>
  <a :href="url" download class="flex px-6 py-2 text-white transition-opacity duration-300 ease-in-out border-2 rounded-lg border-gold bg-secondary hover:opacity-80">
    <slot />
  </a>
</template>
