<script setup lang="ts">
import { SOCIAL_MEDIA_LINKS, UTILS_LINKS } from "../../constantes";
</script>

<template>
  <footer class="flex items-center bg-black-coffee">
    <article
      class="container flex flex-col items-center justify-center py-8 space-y-4 text-bone"
    >
      <UILogo />
      <Heading3>
        Created by ⚡
        <a
          :href="UTILS_LINKS[0].url"
          target="_blank"
          rel="nofollow"
          class="font-semibold underline text-electric"
        >
          Daniel Colmenares
        </a>
        ⚡
      </Heading3>

      <section class="flex items-center justify-center space-x-4">
        <a
          v-for="{ social, url } in SOCIAL_MEDIA_LINKS"
          :key="social"
          target="_blank"
          rel="nofollow"
          :href="url"
          class="transition duration-300 hover:text-gold"
        >
          {{ social }}
        </a>
      </section>
    </article>
  </footer>
</template>
