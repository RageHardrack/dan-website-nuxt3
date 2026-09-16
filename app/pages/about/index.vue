<script setup lang="ts">
import { filterSkillsOptions } from '~/interfaces';

const { data, status, refresh, error } = await useLazyAsyncData(
  'about-me-page',
  fetchAboutPage,
);

const filterSelected = ref('');

const filteredSkills = computed(() => {
  const skills = data.value?.skills || [];
  if (!filterSelected.value) return skills;

  return skills.filter((skill: any) =>
    (skill.properties?.Tags || skill.Tags)?.includes(filterSelected.value),
  );
});

definePageMeta({
  title: 'About me',
});
</script>

<template>
  <LoadingPage :loadMessage="$t('about.loading')" v-if="status === 'pending'" />

  <ErrorMessage
    v-else-if="status === 'error' || Boolean(error) || data?.hasError"
    @retry="refresh"
  />

  <section v-else class="flex flex-col items-center justify-center gap-y-8">
    <header
      class="flex flex-col items-center justify-between w-full gap-4 overflow-hidden md:flex-row md:gap-8"
    >
      <picture>
        <img
          src="~/assets/img/perfil.jpg"
          alt="Daniel Colmenares"
          class="border-4 rounded-full aspect-square w-52 h-52 border-gold"
        />
      </picture>

      <Markdown :content="data?.about || []" />
    </header>

    <ButtonDownload url="/daniel-colmenares-cv.pdf">
      {{ $t('about.cvDownload') }}
    </ButtonDownload>

    <section class="flex flex-col gap-4">
      <Heading2>{{ $t('about.skills') }}</Heading2>

      <FilterOptions
        :filterOptions="Object.values(filterSkillsOptions)"
        v-model="filterSelected"
      />

      <GridSkills size="sm">
        <CardSkill
          v-for="skill in filteredSkills"
          :key="skill.id"
          :skillProps="(skill as any).properties || skill"
        />
      </GridSkills>
    </section>

    <section class="flex flex-col w-full space-y-4">
      <Heading2>{{ $t('about.experience') }}</Heading2>

      <CardExperience
        v-for="xp in data?.experiences || []"
        :key="xp.id"
        :xpProperties="(xp as any).properties || xp"
      />
    </section>
  </section>
</template>
