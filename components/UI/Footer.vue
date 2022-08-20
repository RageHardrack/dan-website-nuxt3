<script setup lang="ts">
import { SOCIAL_MEDIA_LINKS } from "../../constantes";
</script>

<template>
  <footer class="flex items-center bg-black-coffee">
    <article
      class="container flex flex-col items-center justify-center py-8 space-y-4 text-bone"
    >
      <UILogo />
      <!-- TODO: Make my name a CTA -->
      <h2>
        Created by ⚡
        <span class="font-semibold underline text-electric"
          >Daniel Colmenares</span
        >
        ⚡
      </h2>

      <section class="flex items-center justify-center space-x-4">
        <a
          v-for="{ social, url } in SOCIAL_MEDIA_LINKS"
          :key="social"
          target="_blank"
          :href="url"
          class="transition duration-300 hover:text-gold"
        >
          {{ social }}
        </a>
      </section>
    </article>
  </footer>
</template>
