<script setup lang="ts">
const { data, pending } = await useLazyFetch("/api/about-me");

definePageMeta({
  title: "About me",
});
</script>

<template>
  <LoadingPage loadMessage="Loading posts" v-if="pending" />

  <section v-else class="flex flex-col justify-center space-y-4 md:space-y-8">
    <Markdown :content="data!" />
  </section>
</template>
