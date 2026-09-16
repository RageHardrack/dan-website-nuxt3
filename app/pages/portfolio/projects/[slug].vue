<script setup lang="ts">
import type { ProjectPageApiResponse } from '~/interfaces';

const route = useRoute();
const { slug } = route.params;
const localePath = useLocalePath();

const baseUrl = useApiBase();

const { data, pending } = await useLazyFetch<ProjectPageApiResponse>(
  `${baseUrl}/projects/${slug}`,
);

const projectProps = computed(() => {
  if (!data.value?.project) return null;
  return ((data.value.project as any).properties || data.value.project) as any;
});

useSeoMeta({
  title: () =>
    projectProps.value?.Name
      ? `${projectProps.value.Name} - Daniel Colmenares`
      : 'Daniel Colmenares',
  ogTitle: () =>
    projectProps.value?.Name
      ? `${projectProps.value.Name} - Daniel Colmenares`
      : 'Daniel Colmenares',
  description: () =>
    projectProps.value?.Name
      ? `Detalles y especificaciones del proyecto: ${projectProps.value.Name}`
      : 'Detalles del proyecto',
  ogDescription: () =>
    projectProps.value?.Name
      ? `Detalles y especificaciones del proyecto: ${projectProps.value.Name}`
      : 'Detalles del proyecto',
  ogImage: () => projectProps.value?.Preview,
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <LoadingPage :loadMessage="$t('portfolio.loading')" v-if="pending" />

  <section
    v-else-if="data && projectProps"
    class="flex flex-col justify-center space-y-8"
  >
    <header class="flex flex-col w-full space-y-4">
      <NuxtLink
        :to="localePath('/portfolio')"
        class="inline-flex items-center font-semibold underline transition duration-300 text-electric hover:text-secondary self-start"
      >
        {{ $t('portfolio.return') }}
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
          {{ $t('portfolio.viewRepo') }}
        </a>
      </div>
    </header>

    <Divider />

    <main class="w-full">
      <Markdown :content="data.content || []" />
    </main>
  </section>
</template>
