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
      <Markdown :content="data.content" />

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
