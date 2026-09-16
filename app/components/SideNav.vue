<script setup lang="ts">
import { ROUTES_LINKS } from '~/constantes';

const localePath = useLocalePath();
const { toggleSideNav } = useUIStore();
</script>

<template>
  <aside class="fixed inset-0 z-20 flex flex-col bg-bone md:hidden">
    <header class="container flex items-center justify-between h-24 bg-primary">
      <NuxtLink :to="localePath('/')" @click="toggleSideNav">
        <Heading2 customClass="text-gold">Dan Colmenares</Heading2>
      </NuxtLink>

      <button
        @click="toggleSideNav"
        :aria-label="$t('nav.closeMenu')"
        class="flex items-center justify-center p-1 rounded-full bg-black-coffee cursor-pointer"
      >
        <Icon name="cross" size="32px" class="text-gold" />
      </button>
    </header>

    <ul
      class="container flex flex-col items-center justify-start flex-1 py-4 space-y-8"
    >
      <li
        v-for="{ title, path, i18nKey } in ROUTES_LINKS"
        :key="title"
        class="text-xl font-semibold text-black-coffee"
      >
        <NuxtLink :to="localePath(path)" @click="toggleSideNav">
          {{ i18nKey ? $t(i18nKey) : title }}
        </NuxtLink>
      </li>

      <li class="pt-4" @click="toggleSideNav">
        <LangSwitcher />
      </li>
    </ul>
  </aside>
</template>
