<script setup lang="ts">
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
    <UINavbar />

    <transition name="left">
      <UISideNav v-if="sideNav" />
    </transition>

    <main class="container flex-1 py-8">
      <slot />
    </main>

    <UIFooter />
  </section>
</template>
