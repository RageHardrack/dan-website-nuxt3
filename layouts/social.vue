<script setup lang="ts">
const route = useRoute();

useHead({
  title: `Daniel Colmenares - ${route.meta.title}`,
});
</script>

<template>
  <section
    class="container flex flex-col items-center justify-center min-h-screen space-y-4 md:space-y-8"
  >
    <slot />
  </section>
</template>
