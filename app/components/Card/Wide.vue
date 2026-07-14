<script setup lang="ts">
interface Props {
  isLink?: boolean;
}

const { isLink = false } = defineProps<Props>();
</script>

<template>
  <article
    :class="`flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 rounded-lg md:max-h-96 overflow-hidden shadow-xl bg-bone ${
      isLink ? 'cursor-pointer' : 'cursor-auto'
    }`"
  >
    <aside class="md:w-2/3">
      <slot name="aside" />
    </aside>

    <section class="flex flex-col w-full p-4 space-y-4 md:h-96 md:w-1/3">
      <header class="flex flex-wrap items-center justify-start">
        <slot name="header" />
      </header>

      <section class="flex flex-col flex-1 space-y-4">
        <slot name="content" />
      </section>

      <footer class="flex items-center justify-end">
        <slot name="footer" />
      </footer>
    </section>
  </article>
</template>
