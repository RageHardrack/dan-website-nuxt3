<script setup lang="ts">
interface Props {
  loadMessage: string;
}

defineProps<Props>();
</script>

<template>
  <section class="flex flex-col items-center justify-center space-y-4 h-[60vh]">
    <UILoading color="primary" />
    <UIHeader as="h2" customClass="text-primary">{{ loadMessage }}</UIHeader>
  </section>
</template>
