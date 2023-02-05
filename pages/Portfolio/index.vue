<script setup lang="ts">
const { data, pending } = await useLazyAsyncData("portfolio", () =>
  $fetch("/api/portfolio")
);

const filterOptions = [
  "Frontend",
  "Backend",
  "VueJS",
  "ReactJS",
  "NextJS",
  "Typescript",
];

const filterSelected = ref("");

const onChangeFilterOptions = (optionSelected: string) =>
  (filterSelected.value = optionSelected);

const filteredProjects = computed(() => {
  if (!filterSelected.value) return data!.value!.projects;

  return data!.value!.projects.filter((project) =>
    project.properties.Tags.includes(filterSelected.value)
  );
});

definePageMeta({
  title: "Portfolio",
});
</script>

<template>
  <NuxtLayout>
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

      <section class="flex flex-col space-y-2">
        <Heading2>Projects</Heading2>

        <section class="flex flex-wrap gap-x-1 gap-y-2">
          <button
            v-for="option in filterOptions"
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
        </section>

        <Grid size="lg">
          <CardProject
            v-for="project in filteredProjects"
            :key="project.id"
            :projectProps="project.properties"
          />
        </Grid>
      </section>

      <section class="flex flex-col space-y-2">
        <Heading2>Skills</Heading2>
        <Grid size="sm">
          <CardSkill
            v-for="skill in data!.skills"
            :key="skill.id"
            :skillProps="skill.properties"
          />
        </Grid>
      </section>
    </section>
  </NuxtLayout>
</template>
