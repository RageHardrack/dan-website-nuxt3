<script setup lang="ts">
const { data, pending } = await useLazyAsyncData("portfolio", () =>
  $fetch("/api/portfolio")
);

definePageMeta({
  title: "Portfolio",
});
</script>

<template>
  <NuxtLayout>
    <LoadingPage loadMessage="Loading Portfolio..." v-if="pending" />

    <section v-else class="flex flex-col space-y-5">
      <header
        class="flex lg:flex-row flex-col-reverse justify-between"
        v-motion-slide-top
      >
        <div class="lg:w-3/4 w-full">
          <Markdown :content="data.content" />
        </div>

        <picture
          class="lg:w-1/4 w-full lg:p-4 pb-4 flex overflow-hidden items-center justify-center"
        >
          <img
            src="~~/assets/img/perfil.jpg"
            alt="Daniel Colmenares"
            class="aspect-square w-52 h-52 rounded-full border-4 border-gold"
          />
        </picture>
      </header>

      <section class="flex flex-col space-y-2">
        <Heading2 v-motion-slide-top>Projects</Heading2>
        <Grid size="lg">
          <CardProject
            v-for="project in data.projects"
            :key="project.id"
            :projectProps="project.properties"
          />
        </Grid>
      </section>

      <section class="flex flex-col space-y-2">
        <Heading2 v-motion-slide-top>Skills</Heading2>
        <Grid size="sm">
          <CardSkill
            v-for="skill in data.skills"
            :key="skill.id"
            :skillProps="skill.properties"
          />
        </Grid>
      </section>
    </section>
  </NuxtLayout>
</template>
