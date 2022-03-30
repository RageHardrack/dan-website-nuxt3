<script setup lang="ts">
interface Props {
  isLink?: boolean;
}

const { isLink = false } = defineProps<Props>();
</script>

<template>
  <article
    :class="`flex flex-col justify-between space-y-4 duration-300 transform rounded-lg shadow-lg bg-primary hover:scale-105 overflow-hidden ${
      isLink ? 'cursor-pointer' : 'cursor-auto'
    }`"
  >
    <header>
      <slot name="header" />
    </header>

    <section class="flex flex-col p-4 space-y-2">
      <slot name="content" />
    </section>

    <footer class="flex flex-wrap items-center justify-start p-4">
      <slot name="footer" />
    </footer>
  </article>
</template>
