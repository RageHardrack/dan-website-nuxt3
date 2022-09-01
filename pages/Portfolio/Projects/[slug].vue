<script setup lang="ts">
const route = useRoute();

const { slug } = route.params;
const { data, pending, refresh } = await useLazyAsyncData(
  "ProjectContent",
  () => $fetch(`/api/projects/${slug}`)
);

refresh();
</script>

<template>
  <NuxtLayout>
    <LoadingPage loadMessage="Loading Project" v-if="pending" />

    <section v-else class="flex flex-col justify-center space-y-8">
      <NuxtLink
        to="/portfolio"
        class="font-semibold underline transition duration-300 text-electric hover:text-secondary"
      >
        <Heading3>Return to Portfolio</Heading3>
      </NuxtLink>
      <Markdown :content="data" />
    </section>
  </NuxtLayout>
</template>
