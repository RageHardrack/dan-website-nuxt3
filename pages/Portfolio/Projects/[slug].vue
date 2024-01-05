<script setup lang="ts">
import type { ProjectPageApiResponse } from "~~/interfaces";

const route = useRoute();

const { slug } = route.params;

const { data, pending } = await useLazyFetch<ProjectPageApiResponse>(
  `/api/projects/${slug}`
);
</script>

<template>
  <LoadingPage loadMessage="Loading Project" v-if="pending" />

  <section v-else class="flex flex-col justify-center space-y-8">
    <NuxtLink
      to="/portfolio"
      class="font-semibold underline transition duration-300 text-electric hover:text-secondary"
    >
      <Heading3>Return to Portfolio</Heading3>
    </NuxtLink>

    <Markdown :content="data!.content" />
  </section>
</template>
