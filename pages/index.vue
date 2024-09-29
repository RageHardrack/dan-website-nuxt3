<script setup lang="ts">
import { UTILS_LINKS } from "~/constantes";

definePageMeta({
  title: "Daniel Colmenares",
});
</script>

<template>
  <section class="flex flex-col items-center justify-center">
    <article class="flex items-center justify-between w-full">
      <section class="flex flex-col items-center justify-center flex-1 gap-8">
        <Heading1>Daniel Colmenares</Heading1>
        <Heading2>This page is under Construction...</Heading2>

        <p>Last Update: {{ $dayjs("09-29-2024").format("MM/DD/YY") }}</p>

        <a :href="UTILS_LINKS[0].url" target="_blank" rel="nofollow">
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
