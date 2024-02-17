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

  <section
    v-else
    class="flex flex-col items-center justify-center gap-y-8"
  >
    <header class="flex items-center justify-between w-full overflow-hidden">
      <picture>
        <img
          src="~~/assets/img/perfil.jpg"
          alt="Daniel Colmenares"
          class="border-4 rounded-full aspect-square w-52 h-52 border-gold"
        />
      </picture>
    </header>

    <Markdown :content="data!.content" />

    <ButtonDownload url="/daniel-colmenares-cv.pdf"
      >Download my CV</ButtonDownload
    >
  </section>
</template>
