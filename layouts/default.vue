<script setup lang="ts">
import { useUIStore } from "~~/store";
const route = useRoute();

const { getShowSideBar } = useUIStore();

useHead({
  title: `Daniel Colmenares - ${route.meta.title}`,
});
</script>

<template>
  <section class="flex flex-col justify-between min-h-screen">
    <Navbar />

    <transition-slide :offset="['-100%', 0]" :duration="500">
      <SideNav v-if="getShowSideBar" />
    </transition-slide>

    <main class="container flex-1 py-4 md:py-8">
      <slot />
    </main>

    <Footer />
  </section>
</template>
