<script setup lang="ts">
const { data, pending } = await useLazyAsyncData("about", () =>
  $fetch("/api/about-me")
);

definePageMeta({
  title: "About me",
});
</script>

<template>
  <NuxtLayout>
    <LoadingPage loadMessage="Loading posts" v-if="pending" />

    <section v-else class="flex flex-col justify-center space-y-4 md:space-y-8">
      <Markdown :content="data" v-motion-slide-right />
    </section>
  </NuxtLayout>
</template>
