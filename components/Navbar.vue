<script setup lang="ts">
import { ROUTES_LINKS } from "~~/constantes";

const { toggleSideNav } = useUIStore();

const route = useRoute();
const activePage = computed(() => {
  if (route.path) return `/${route.path.split("/")[1]}`;
  
  return "";
});
</script>

<template>
  <header class="sticky top-0 z-20 flex items-center bg-primary">
    <nav class="container flex items-center justify-between py-2">
      <NuxtLink to="/">
        <LogoReverse />
      </NuxtLink>

      <ul
        class="items-center justify-center hidden space-x-4 md:flex text-bone"
      >
        <NuxtLink
          v-for="{ title, path } in ROUTES_LINKS"
          :key="title"
          :to="path"
          class="text-lg transition duration-300 ease-in-out hover:text-gold"
          :class="activePage === path ? 'router-link-active' : ''"
        >
          {{ title }}
        </NuxtLink>
      </ul>

      <ButtonMenu @pressButton="toggleSideNav" class="flex md:hidden" />
    </nav>
  </header>
</template>
