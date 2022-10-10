<script setup lang="ts">
interface Props {
  type: string;
}

const { type } = defineProps<Props>();
</script>

<template>
  <IconTwitterSvg v-if="type === 'Twitter'" class="w-10 h-10" />
  <IconLinkedInSvg v-else-if="type === 'LinkedIn'" class="w-10 h-10" />
  <IconGitHubSvg v-else-if="type === 'GitHub'" class="w-10 h-10" />
  <IconInstagramSvg v-else-if="type === 'Instagram'" class="w-10 h-10" />
</template>
