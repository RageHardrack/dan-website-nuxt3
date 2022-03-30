<script setup lang="ts">
interface Props {
  as: "h1" | "h2" | "h3" | "h4" | "h5";
  customClass?: string;
}

const { as, customClass = "" } = defineProps<Props>();
</script>

<template>
  <h1
    v-if="as === 'h1'"
    :class="`text-3xl font-bold font-sans leading-8 ${customClass}`"
  >
    <slot />
  </h1>

  <h2
    v-if="as === 'h2'"
    :class="`text-xl sm:text-2xl font-semibold font-sans leading-8 ${customClass}`"
  >
    <slot />
  </h2>

  <h3
    v-if="as === 'h3'"
    :class="`text-xl font-semibold font-sans leading-8 ${customClass}`"
  >
    <slot />
  </h3>

  <h4
    v-if="as === 'h4'"
    :class="`text-lg font-semibold font-sans ${customClass}`"
  >
    <slot />
  </h4>

  <h5 v-if="as === 'h5'" :class="`font-semibold font-sans ${customClass}`">
    <slot />
  </h5>
</template>
