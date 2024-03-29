<script setup lang="ts">
import type {
  ApiResponseContentBlock,
  IExperience,
  ISkill,
} from "~/interfaces";

const { data: about, pending: aboutPending } =
  await useLazyFetch<ApiResponseContentBlock>("/api/about-me");

const { data: skills, pending: skillsPending } = await useLazyFetch<ISkill[]>(
  "/api/skills"
);

const { data: experiences, pending: xpPending } = await useLazyFetch<
  IExperience[]
>("/api/experience");

const pendingData = computed(
  () => aboutPending.value && skillsPending.value && xpPending.value
);

definePageMeta({
  title: "About me",
});
</script>

<template>
  <LoadingPage loadMessage="Loading About page" v-if="pendingData" />

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

      <Markdown :content="about!.content" />
    </header>

    <ButtonDownload url="/daniel-colmenares-cv.pdf"
      >Download my CV</ButtonDownload
    >

    <section class="flex flex-col space-y-4">
      <Heading2>Skills</Heading2>
      <GridSkills size="sm">
        <CardSkill
          v-for="skill in skills"
          :key="skill.id"
          :skillProps="skill.properties"
        />
      </GridSkills>
    </section>

    <section class="flex flex-col w-full space-y-4">
      <Heading2>Profesional Experience</Heading2>
      <CardExperience
        v-for="xp in experiences"
        :key="xp.id"
        :xpProperties="xp.properties"
      />
    </section>
  </section>
</template>
