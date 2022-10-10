<script setup lang="ts">
import { SOCIAL_MEDIA_LINKS, UTILS_LINKS } from "~~/constantes";
</script>

<template>
  <footer class="flex items-center bg-black-coffee">
    <article
      class="container flex flex-col items-center justify-center py-8 space-y-4 text-bone"
    >
      <UILogo />
      <h2>
        Created by ⚡
        <a
          :href="UTILS_LINKS[0].url"
          target="_blank"
          rel="nofollow"
          class="font-semibold underline transition duration-300 text-electric hover:text-secondary"
        >
          Daniel Colmenares
        </a>
        ⚡
      </h2>

      <section class="flex items-center justify-center space-x-4">
        <a
          v-for="{ social, url } in SOCIAL_MEDIA_LINKS"
          class="transition duration-300 hover:text-gold"
          rel="nofollow"
          target="_blank"
          :href="url"
          :key="social"
          :title="social"
        >
          <IconEnum :type="social" />
        </a>
      </section>
    </article>
  </footer>
</template>
