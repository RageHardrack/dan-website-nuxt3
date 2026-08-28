<script setup lang="ts">
const route = useRoute();

const uiStore = useUIStore();
const { showSideBar } = storeToRefs(uiStore);

useHead({
  title: `Daniel Colmenares - ${route.meta.title}`,
});
</script>

<template>
  <section class="flex flex-col justify-between min-h-screen">
    <Navbar />

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <SideNav v-if="showSideBar" />
    </Transition>

    <main class="container flex-1 py-4 md:py-8">
      <slot />
    </main>

    <Footer />
  </section>
</template>
