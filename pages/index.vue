<script setup lang="ts">
definePageMeta({
  title: "Daniel Colmenares",
});
</script>

<template>
  <section class="flex flex-col items-center justify-center">
    <article class="flex items-center justify-between w-full">
      <section class="flex flex-col items-center justify-center flex-1 gap-8">
        <Heading1>Daniel Colmenares</Heading1>
        <Heading2>My page is under Construction...</Heading2>
        <Icon name="gitHub" size="48px" class="text-primary" />
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
