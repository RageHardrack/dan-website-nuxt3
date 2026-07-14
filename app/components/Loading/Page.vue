<script setup lang="ts">
interface Props {
  loadMessage: string;
}

defineProps<Props>();
</script>

<template>
  <section class="flex flex-col items-center justify-center space-y-4 h-[60vh]">
    <Loading color="primary" />
    <Heading2 customClass="text-primary">{{ loadMessage }}</Heading2>
  </section>
</template>
