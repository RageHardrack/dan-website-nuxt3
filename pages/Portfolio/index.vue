<script setup lang="ts">
const { data, pending } = await useLazyAsyncData("portfolio", () =>
  $fetch("/api/portfolio")
);
const isOpen = ref(false);

const toggleModal = () => (isOpen.value = !isOpen.value);

definePageMeta({
  title: "Portfolio",
});
</script>

<template>
  <NuxtLayout>
    <LoadingPage loadMessage="Loading Portfolio..." v-if="pending" />

    <section v-else class="flex flex-col space-y-10">
      <Markdown :content="data.content" />

      <Modal v-if="isOpen" @closeModal="toggleModal">
        <UICard color="transparent">
          <template #header>Hello</template>

          <template #content>there</template>

          <template #footer>General Kenobi!</template>
        </UICard>
      </Modal>

      <section class="flex flex-col space-y-2">
        <Heading2>Projects</Heading2>
        <UIGrid>
          <PortfolioProjectCard
            @click="toggleModal"
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
