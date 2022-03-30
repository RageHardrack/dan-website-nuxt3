<script setup lang="ts">
import Loading from "../Loaders/Loading.vue";
import Header from "../Typography/Header.vue";

interface Props {
  loadMessage: string;
}

defineProps<Props>();
</script>

<template>
  <section class="flex flex-col items-center justify-center space-y-4 h-[60vh]">
    <Loading color="primary" />
    <Header as="h2" customClass="text-primary">{{ loadMessage }}</Header>
  </section>
</template>
