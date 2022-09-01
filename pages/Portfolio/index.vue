<script setup lang="ts">
import { useUIStore } from "~~/store";

const store = useUIStore();

const { data, pending } = await useLazyAsyncData("portfolio", () =>
  $fetch("/api/portfolio")
);

const isOpen = computed(() => store.getIsModalOpen);

const openModal = store.openModal;

definePageMeta({
  title: "Portfolio",
});
</script>

<template>
  <NuxtLayout>
    <LoadingPage loadMessage="Loading Portfolio..." v-if="pending" />

    <section v-else class="flex flex-col space-y-10">
      <Markdown :content="data.content" />

      <Modal v-if="isOpen">
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
            @click="openModal"
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
