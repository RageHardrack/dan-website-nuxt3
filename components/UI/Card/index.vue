<script setup lang="ts">
interface Props {
  hasClick?: boolean;
  color?: string;
  hasHover?: boolean;
}

const { hasClick, color, hasHover } = defineProps<Props>();

const hoverClass = hasHover ? "transform duration-300 hover:scale-110" : "";
const clickClass = hasClick ? "cursor-pointer" : "cursor-auto";
</script>

<template>
  <article
    :class="`flex flex-col justify-between space-y-2 rounded-lg shadow-lg bg-${
      color || 'primary'
    } ${hoverClass} overflow-hidden ${clickClass} h-80`"
  >
    <header class="relative overflow-hidden h-1/3">
      <slot name="header" />
    </header>

    <section class="flex flex-col p-4 space-y-2 h-1/3">
      <slot name="content" />
    </section>

    <footer class="flex flex-wrap items-center justify-start p-4 h-1/3">
      <slot name="footer" />
    </footer>
  </article>
</template>
