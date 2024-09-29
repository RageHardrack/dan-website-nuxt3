<script setup lang="ts">
import { filterSkillsOptions } from "~/interfaces";

const { data, status } = await useLazyAsyncData(
  "about-me-page",
  fetchAboutPage
);

console.log({ status: status.value });

const filterSelected = ref("");

const filteredSkills = computed(() => {
  if (!filterSelected.value) return data.value!.skills;

  return data.value!.skills.filter((skill) =>
    skill.properties.Tags.includes(filterSelected.value)
  );
});

definePageMeta({
  title: "About me",
});
</script>

<template>
  <LoadingPage loadMessage="Loading About page" v-if="status === 'pending'" />

  <section v-else class="flex flex-col items-center justify-center gap-y-8">
    <header
      class="flex flex-col items-center justify-between w-full gap-4 overflow-hidden md:flex-row md:gap-8"
    >
      <picture>
        <img
          src="~~/assets/img/perfil.jpg"
          alt="Daniel Colmenares"
          class="border-4 rounded-full aspect-square w-52 h-52 border-gold"
        />
      </picture>

      <Markdown :content="data!.about.content" />
    </header>

    <ButtonDownload url="/daniel-colmenares-cv.pdf"
      >Download my CV</ButtonDownload
    >

    <section class="flex flex-col gap-4">
      <Heading2>Skills</Heading2>

      <FilterOptions
        :filterOptions="Object.values(filterSkillsOptions)"
        v-model="filterSelected"
      />

      <GridSkills size="sm">
        <CardSkill
          v-for="skill in filteredSkills"
          :key="skill.id"
          :skillProps="skill.properties"
        />
      </GridSkills>
    </section>

    <section class="flex flex-col w-full space-y-4">
      <Heading2>Profesional Experience</Heading2>

      <CardExperience
        v-for="xp in data!.experiences"
        :key="xp.id"
        :xpProperties="xp.properties"
      />
    </section>
  </section>
</template>
