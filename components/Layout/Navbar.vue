<script setup lang="ts">
import MenuButton from "../UI-kit/Buttons/MenuButton.vue";
import { ROUTES_LINKS } from "../../constantes";
import Logo from "./Logo.vue";

const toggleSideNav = inject<() => boolean>("toggleSideNav");
</script>

<template>
  <header class="flex items-center h-24 bg-primary">
    <nav class="container flex items-center justify-between py-2">
      <NuxtLink to="/">
        <Logo />
      </NuxtLink>

      <ul
        class="items-center justify-center hidden space-x-4 font-bold md:flex text-bone"
      >
        <li v-for="{ title, path } in ROUTES_LINKS" :key="title">
          <NuxtLink :to="path">
            {{ title }}
          </NuxtLink>
        </li>
      </ul>

      <MenuButton @pressButton="toggleSideNav" class="flex md:hidden" />
    </nav>
  </header>
</template>
