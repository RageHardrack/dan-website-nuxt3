<script setup lang="ts">
const route = useRoute();

const { getShowSideBar } = useUIStore();

useHead({
  title: `Daniel Colmenares - ${route.meta.title}`,
});
</script>

<template>
  <section class="flex flex-col justify-between min-h-screen">
    <Navbar />

    <transition-slide :offset="['-100%', 0]">
      <SideNav v-if="getShowSideBar" />
    </transition-slide>

    <main class="container flex-1 py-4 md:py-8">
      <slot />
    </main>

    <Footer />
  </section>
</template>
