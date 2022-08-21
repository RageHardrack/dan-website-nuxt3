<script setup lang="ts">
const { data, pending, refresh } = await useLazyAsyncData("portfolio", () =>
  $fetch("/api/portfolio/get-portfolio")
);

refresh();

definePageMeta({
  title: "Daniel Colmenares - Portfolio",
});
</script>

<template>
  <NuxtLayout>
    <LoadingPage loadMessage="Loading Portfolio..." v-if="pending" />

    <section v-else class="flex flex-col space-y-10">
      <header class="flex flex-col space-y-4">
        <Heading1>My Portfolio</Heading1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ex
          doloribus distinctio, eos facilis illum consequatur maiores quo modi
          in magni iusto aperiam porro quia eligendi delectus perferendis culpa
          nam.
        </p>
      </header>

      <section class="flex flex-col space-y-2">
        <Heading2>Projects</Heading2>
        <UIGrid>
          <PortfolioProjectCard
            v-for="project in data.projects"
            :key="project.id"
            :projectProps="project.properties"
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
          />
        </UIGridTechs>
      </section>
    </section>
  </NuxtLayout>
</template>
