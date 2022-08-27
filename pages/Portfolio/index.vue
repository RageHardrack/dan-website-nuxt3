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

    <section v-else class="flex flex-col space-y-10">
      <header class="flex flex-col space-y-4">
        <Heading1>My Work</Heading1>
        <p>
          Web developer, tech enthusiast, amateur writer and passionate about
          video games. I love to learn something new every day, creating
          solutions using technology and code. I used to be a bike messenger in
          Mail On Bike, then I created a Administrative System for them so it
          can improve their operations and efficiency. My dreams are to develop
          an RPG video game, write a Sci-fi novel and teach others about
          technology and programming. Lover of coffee, science and music.
        </p>
      </header>

      <section class="flex flex-col space-y-2">
        <Heading2>Projects</Heading2>
        <UIGrid>
          <PortfolioProjectCard
            v-for="project in data.projects"
            :key="project.id"
            :projectProps="project.properties"
            v-motion-slide-right
          />
        </UIGrid>
      </section>

      <section class="flex flex-col space-y-2">
        <Heading2>Skills</Heading2>
        <UIGridTechs>
          <PortfolioSkillCard
            v-for="skill in data.skills"
            :key="skill.id"
            :skillProps="skill.properties"
            v-motion-slide-left
          />
        </UIGridTechs>
      </section>
    </section>
  </NuxtLayout>
</template>
