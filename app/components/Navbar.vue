<script setup lang="ts">
import { ROUTES_LINKS } from '~/constantes';

const localePath = useLocalePath();
const uiStore = useUIStore();
const handleToggleSideNav = () => {
  uiStore.toggleSideNav();
};

const route = useRoute();
const activePage = computed(() => {
  if (!route.path) return '';
  const segments = route.path.split('/').filter(Boolean);
  // If first segment is a locale code like 'en', inspect next segment
  const mainSegment = segments[0] === 'en' ? segments[1] : segments[0];
  return mainSegment ? `/${mainSegment}` : '/';
});
</script>

<template>
  <header class="sticky top-0 z-20 flex items-center bg-primary">
    <nav class="container flex items-center justify-between py-2">
      <NuxtLink :to="localePath('/')">
        <LogoReverse />
      </NuxtLink>

      <div class="flex items-center space-x-6">
        <ul
          class="items-center justify-center hidden space-x-4 md:flex text-bone"
        >
          <li v-for="{ title, path, i18nKey } in ROUTES_LINKS" :key="title">
            <NuxtLink
              :to="localePath(path)"
              class="text-lg transition duration-300 ease-in-out hover:text-gold"
              :class="activePage === path ? 'router-link-active' : ''"
            >
              {{ i18nKey ? $t(i18nKey) : title }}
            </NuxtLink>
          </li>
        </ul>

        <div class="hidden md:flex items-center">
          <LangSwitcher />
        </div>
      </div>

      <div class="flex md:hidden items-center space-x-3">
        <LangSwitcher />
        <ButtonMenu @pressButton="handleToggleSideNav" />
      </div>
    </nav>
  </header>
</template>
