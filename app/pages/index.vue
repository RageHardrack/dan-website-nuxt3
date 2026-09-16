<script setup lang="ts">
import { UTILS_LINKS } from '~/constantes';

const dayjs = useDayjs();

definePageMeta({
  title: 'Daniel Colmenares',
});
</script>

<template>
  <section class="flex flex-col items-center justify-center">
    <article
      class="flex flex-col-reverse md:flex-row items-center justify-between w-full gap-8"
    >
      <section class="flex flex-col items-center justify-center flex-1 gap-8">
        <Heading1>{{ $t('home.title') }}</Heading1>
        <Heading2>{{ $t('home.underConstruction') }}</Heading2>

        <p>{{ $t('home.lastUpdate') }}: {{ dayjs('09-29-2024').format('MM/DD/YY') }}</p>

        <a :href="UTILS_LINKS[0]?.url" target="_blank" rel="nofollow">
          <Icon name="gitHub" size="48px" class="text-primary" />
        </a>
      </section>

      <picture class="flex flex-col items-center justify-center flex-1">
        <Logo />
      </picture>
    </article>
  </section>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
