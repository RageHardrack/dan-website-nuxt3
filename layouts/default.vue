<script setup lang="ts">
import Navbar from "~~/components/Layout/Navbar.vue";
import SideNav from "~~/components/Layout/SideNav.vue";
import Footer from "~~/components/Layout/Footer.vue";

const route = useRoute();
const sideNav = ref<boolean>(false);

const toggleSideNav = (): boolean => (sideNav.value = !sideNav.value);

provide("sideNav", sideNav);
provide("toggleSideNav", toggleSideNav);

useMeta({
  title: computed(() => route.meta.title),
});
</script>

<template>
  <section class="flex flex-col justify-between min-h-screen">
    <Navbar />

    <transition name="left">
      <SideNav v-if="sideNav" />
    </transition>

    <main class="container flex-1 py-8">
      <slot />
    </main>

    <Footer />
  </section>
</template>
