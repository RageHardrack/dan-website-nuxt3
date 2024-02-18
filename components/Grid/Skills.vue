<script setup lang="ts">
interface Props {
  size: "sm" | "md" | "lg";
}

const { size } = defineProps<Props>();

const sizeClass = computed(() => {
  switch (size) {
    case "sm":
      return "grid grid-cols-4 gap-4 md:gap-8 xl:gap-10 md:grid-cols-8 lg:grid-cols-10";
    case "md":
      return "grid grid-cols-2 gap-4 md:gap-8 xl:gap-10 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-5";
    case "lg":
      return "grid grid-cols-4 gap-4 md:gap-8 md:grid-cols-8 lg:grid-cols-12";
    default:
      return "grid grid-cols-1 gap-4 md:gap-8 xl:gap-10 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5";
  }
});
</script>

<template>
  <transition-slide tag="section" group :class="sizeClass" :duration="500">
    <slot />
  </transition-slide>
</template>
