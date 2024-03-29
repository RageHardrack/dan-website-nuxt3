<script setup lang="ts">
import {
  filterProjectOptions,
  type PortfolioPageApiResponse,
} from "~~/interfaces";

const { data, pending } = await useLazyFetch<PortfolioPageApiResponse>(
  "/api/portfolio"
);

const filterSelected = ref("");

const onChangeFilterOptions = (optionSelected: string) =>
  (filterSelected.value = optionSelected);

const filteredProjects = computed(() => {
  if (!filterSelected.value) return data.value!.projects;

  return data.value!.projects.filter((project) =>
    project.properties.Tags.includes(filterSelected.value)
  );
});

definePageMeta({
  title: "Portfolio",
});
</script>

<template>
  <LoadingPage loadMessage="Loading Portfolio..." v-if="pending" />

  <section v-else class="flex flex-col space-y-5">
    <header class="flex flex-col-reverse justify-between lg:flex-row">
      <div class="w-full lg:w-3/4">
        <Markdown :content="data!.content" />
      </div>
      <picture
        class="flex items-center justify-center w-full pb-4 overflow-hidden lg:w-1/4 lg:p-4"
      >
        <img
          src="~~/assets/img/perfil.jpg"
          alt="Daniel Colmenares"
          class="border-4 rounded-full aspect-square w-52 h-52 border-gold"
        />
      </picture>
    </header>

    <section class="flex flex-col space-y-4">
      <Heading2>Projects</Heading2>

      <header class="flex flex-wrap gap-x-1 gap-y-2">
        <button
          v-for="option in filterProjectOptions"
          :key="option"
          @click="onChangeFilterOptions(option)"
          class="px-3 py-1 transition duration-300 ease-in-out border rounded-lg border-gold hover:bg-gold"
          :class="{ 'bg-gold font-semibold': option === filterSelected }"
        >
          {{ option }}
        </button>

        <button
          @click="onChangeFilterOptions('')"
          class="px-3 py-1 transition duration-300 ease-in-out border rounded-lg border-gold hover:bg-gold"
          :class="{ 'bg-gold font-semibold': filterSelected === '' }"
        >
          All
        </button>
      </header>
      
      <Grid size="lg">
        <CardProject
          v-for="project in filteredProjects"
          :key="project.id"
          :projectProps="project.properties"
        />
      </Grid>
    </section>
  </section>
</template>
