<script setup lang="ts">
import Logo from "./Logo.vue";
import { SOCIAL_MEDIA_LINKS } from "../../constantes";
</script>

<template>
  <footer class="flex items-center bg-black-coffee">
    <article
      class="container flex flex-col items-center justify-center py-8 space-y-4 text-bone"
    >
      <Logo />
      <h2>Desarrollado por Daniel Colmenares</h2>

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
