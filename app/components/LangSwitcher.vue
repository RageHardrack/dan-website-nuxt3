<script setup lang="ts">
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return (locales.value as Array<{ code: string; name: string }>).filter(
    (l) => l.code !== locale.value,
  );
});
</script>

<template>
  <div class="flex items-center space-x-2">
    <NuxtLink
      v-for="targetLocale in availableLocales"
      :key="targetLocale.code"
      :to="switchLocalePath(targetLocale.code)"
      class="inline-flex items-center justify-center px-2.5 py-1 text-xs font-bold uppercase transition duration-300 border rounded border-gold text-bone hover:bg-gold hover:text-black-coffee focus:outline-none focus:ring-2 focus:ring-gold"
      :aria-label="`Switch to ${targetLocale.name}`"
    >
      {{ targetLocale.code }}
    </NuxtLink>
  </div>
</template>
