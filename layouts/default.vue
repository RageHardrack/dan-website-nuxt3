<script setup lang="ts">
const route = useRoute();
const sideNav = ref<boolean>(false);

const toggleSideNav = (): boolean => (sideNav.value = !sideNav.value);

provide("sideNav", sideNav);
provide("toggleSideNav", toggleSideNav);

useHead({
  title: `Daniel Colmenares - ${route.meta.title}`,
});
</script>

<template>
  <section class="flex flex-col justify-between min-h-screen">
    <Navbar />

    <transition name="left">
      <SideNav v-if="sideNav" />
    </transition>

    <main class="container flex-1 py-4 md:py-8">
      <slot />
    </main>

    <Footer />
  </section>
</template>
