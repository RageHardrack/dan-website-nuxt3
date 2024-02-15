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
    <picture
      class="flex items-center justify-center w-full pb-4 overflow-hidden lg:w-1/4 lg:p-4"
    >
      <img
        src="~~/assets/img/perfil.jpg"
        alt="Daniel Colmenares"
        class="border-4 rounded-full aspect-square w-52 h-52 border-gold"
      />
    </picture>

    <Markdown :content="data!.content" />
  </section>
</template>
