<script setup lang="ts">
interface Props {
  size: "sm" | "md" | "lg";
}

const { size } = defineProps<Props>();

const sizeClass = computed(() => {
  switch (size) {
    case "sm":
      return "grid grid-cols-4 gap-4 md:gap-8 xl:gap-10 md:grid-cols-6 lg:grid-cols-8";
    case "md":
      return "grid grid-cols-1 gap-4 md:gap-8 xl:gap-10 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5";
    case "lg":
      return "grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-3";
    default:
      return "grid grid-cols-1 gap-4 md:gap-8 xl:gap-10 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5";
  }
});
</script>

<template>
  <section
    :class="sizeClass"
  >
    <slot />
  </section>
</template>
