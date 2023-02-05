<script setup lang="ts">
import { ROUTES_LINKS } from "~~/constantes";
import { useUIStore } from "~~/store";

const { toggleSideNav } = useUIStore();
</script>

<template>
  <aside class="fixed inset-0 z-20 flex flex-col bg-bone md:hidden">
    <header class="container flex items-center justify-between h-24 bg-primary">
      <NuxtLink to="/" @click="toggleSideNav">
        <Heading2 customClass="text-gold">Dan Colmenares</Heading2>
      </NuxtLink>

      <button
        @click="toggleSideNav"
        class="flex items-center justify-center p-1 rounded-full bg-black-coffee"
      >
        <Icon name="cross" size="32px" />
      </button>
    </header>

    <ul
      class="container flex flex-col items-center justify-start flex-1 py-4 space-y-8"
    >
      <li
        v-for="{ title, path } in ROUTES_LINKS"
        :key="title"
        class="text-xl font-semibold text-black-coffee"
      >
        <NuxtLink :to="path" @click="toggleSideNav">
          {{ title }}
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>
