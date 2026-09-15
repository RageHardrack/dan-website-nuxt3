<script setup lang="ts">
import { watch } from 'vue';

import type { ProjectPageApiResponse } from '~/interfaces';

const route = useRoute();
const { slug } = route.params;

const baseUrl = useApiBase();

const { data, pending } = await useLazyFetch<ProjectPageApiResponse>(
  `${baseUrl}/projects/${slug}`,
);

const projectProps = computed(() => {
  if (!data.value?.project) return null;
  return ((data.value.project as any).properties || data.value.project) as any;
});

watch(
  data,
  (newData) => {
    const props = (newData?.project as any)?.properties || newData?.project;
    if (props?.Name) {
      useSeoMeta({
        title: `${props.Name} - Daniel Colmenares`,
        ogTitle: `${props.Name} - Daniel Colmenares`,
        description: `Detalles y especificaciones del proyecto: ${props.Name}`,
        ogDescription: `Detalles y especificaciones del proyecto: ${props.Name}`,
        ogImage: props.Preview,
        twitterCard: 'summary_large_image',
      });
    }
  },
  { immediate: true },
);
</script>

<template>
  <LoadingPage loadMessage="Loading Project" v-if="pending" />

  <section
    v-else-if="data && projectProps"
    class="flex flex-col justify-center space-y-8"
  >
    <header class="flex flex-col w-full space-y-4">
      <NuxtLink
        to="/portfolio"
        class="inline-flex items-center font-semibold underline transition duration-300 text-electric hover:text-secondary self-start"
      >
        &larr; Return to Portfolio
      </NuxtLink>

      <picture
        class="w-full md:h-[400px] overflow-hidden rounded-lg shadow-md"
        v-if="projectProps.Preview"
      >
        <img
          :src="projectProps.Preview"
          :alt="`Preview of ${projectProps.Name}`"
          class="object-cover object-center w-full h-full"
        />
      </picture>

      <Heading1>{{ projectProps.Name }}</Heading1>

      <section class="flex flex-wrap items-center justify-start gap-2">
        <Pill v-for="(tag, idx) in projectProps.Tags" :key="idx">
          {{ tag }}
        </Pill>
      </section>

      <div v-if="projectProps.Repository" class="pt-2">
        <a
          :href="projectProps.Repository"
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
      <Markdown :content="data.content || []" />
    </main>
  </section>
</template>
