<script setup lang="ts">
import type { ApiResponseContentBlock } from "~/interfaces";

const { data, pending } = await useLazyFetch<ApiResponseContentBlock>(
  "/api/about-me"
);

definePageMeta({
  title: "About me",
});
</script>

<template>
  <LoadingPage loadMessage="Loading About page" v-if="pending" />

  <section v-else class="flex flex-col justify-center space-y-4 md:space-y-8">
    <Markdown :content="data!.content" />
  </section>
</template>
