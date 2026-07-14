<script setup lang="ts">
import { watch } from "vue";
import type { ProjectPageApiResponse } from "~/interfaces";

const route = useRoute();
const { slug } = route.params;

const config = useRuntimeConfig();
const baseUrl = config.public.apiBaseUrl;

const { data, pending } = await useLazyFetch<ProjectPageApiResponse>(
  `${baseUrl}/projects/${slug}`
);

watch(data, (newData) => {
  if (newData?.project) {
    useSeoMeta({
      title: `${newData.project.properties.Name} - Daniel Colmenares`,
      ogTitle: `${newData.project.properties.Name} - Daniel Colmenares`,
      description: `Detalles y especificaciones del proyecto: ${newData.project.properties.Name}`,
      ogDescription: `Detalles y especificaciones del proyecto: ${newData.project.properties.Name}`,
      ogImage: newData.project.properties.Preview,
      twitterCard: "summary_large_image",
    });
  }
}, { immediate: true });
</script>

<template>
  <LoadingPage loadMessage="Loading Project" v-if="pending" />

  <section v-else-if="data" class="flex flex-col justify-center space-y-8">
    <header class="flex flex-col w-full space-y-4">
      <NuxtLink
        to="/portfolio"
        class="inline-flex items-center font-semibold underline transition duration-300 text-electric hover:text-secondary self-start"
      >
        &larr; Return to Portfolio
      </NuxtLink>

      <picture class="w-full md:h-[400px] overflow-hidden rounded-lg shadow-md" v-if="data.project.properties.Preview">
        <img
          :src="data.project.properties.Preview"
          :alt="`Preview of ${data.project.properties.Name}`"
          class="object-cover object-center w-full h-full"
        />
      </picture>

      <Heading1>{{ data.project.properties.Name }}</Heading1>

      <section class="flex flex-wrap items-center justify-start gap-2">
        <Pill v-for="(tag, idx) in data.project.properties.Tags" :key="idx">
          {{ tag }}
        </Pill>
      </section>

      <div v-if="data.project.properties.Repository" class="pt-2">
        <a
          :href="data.project.properties.Repository"
          target="_blank"
          rel="noopener noreferrer nofollow"
          class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg bg-electric text-bone hover:opacity-90 shadow"
        >
          <Icon name="gitHub" size="20px" />
          Ver Repositorio
        </a>
      </div>
    </header>

    <Divider />

    <main class="w-full">
      <Markdown :content="data.content" />
    </main>
  </section>
</template>
