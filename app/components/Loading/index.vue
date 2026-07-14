<script setup lang="ts">
interface Props {
  color?: string;
}

const { color = "white" } = defineProps<Props>();
</script>

<template>
  <div class="flex items-center justify-center w-full px-2 py-2">
    <span :class="`w-2 h-2 mx-1 bg-${color} rounded-full animate-expand`" />
    <span
      :class="`w-2 h-2 mx-1 bg-${color} rounded-full animate-expand`"
      style="animation-delay: 180ms"
    />
    <span
      :class="`w-2 h-2 mx-1 bg-${color} rounded-full animate-expand`"
      style="animation-delay: 360ms"
    />
  </div>
</template>
