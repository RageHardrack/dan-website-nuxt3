<script setup lang="ts">
import { ROUTES_LINKS } from "~~/constantes";

const toggleSideNav = inject<() => boolean>("toggleSideNav");
</script>

<template>
  <header class="sticky top-0 z-20 flex items-center h-24 bg-primary">
    <nav class="container flex items-center justify-between py-2">
      <NuxtLink to="/">
        <Logo />
      </NuxtLink>

      <ul
        class="items-center justify-center hidden space-x-4 md:flex text-bone"
      >
        <li
          v-for="{ title, path } in ROUTES_LINKS"
          :key="title"
          class="text-lg transition duration-300 ease-in-out hover:text-gold"
        >
          <NuxtLink :to="path">
            {{ title }}
          </NuxtLink>
        </li>
      </ul>

      <ButtonMenu @pressButton="toggleSideNav" class="flex md:hidden" />
    </nav>
  </header>
</template>
