<script setup lang="ts">
import LoadingView from "~~/components/Layout/LoadingView.vue";
import Header from "~~/components/Typography/Header.vue";
import Divider from "~~/components/Layout/Divider.vue";
import LinkButton from "~~/components/Pages/SocialShare/LinkButton.vue";

const { data, pending } = await useLazyAsyncData("links", () =>
  $fetch("/api/links/get-links")
);

definePageMeta({
  title: "Daniel Colmenares - Links",
});
</script>

<template>
  <NuxtLayout name="social">
    <LoadingView loadMessage="Cargando" v-if="pending" />

    <section
      class="container flex flex-col items-center justify-center min-h-screen space-y-4 md:space-y-8"
      v-else
    >
      <header
        class="flex flex-col items-center justify-center w-full space-y-4 md:w-1/2"
      >
        <picture
          class="flex w-48 h-48 overflow-hidden border-4 rounded-full md:w-60 md:h-60 border-gold"
        >
          <img
            src="~~/assets/img/perfil.jpg"
            alt="Daniel Colmenares"
            class="aspect-square"
          />
        </picture>

        <Header as="h1" customClass="text-gold">Daniel Colmenares</Header>
        <Header as="h3" customClass="text-black-coffee">
          Desarrollador Web Junior
        </Header>

        <Divider />
      </header>

      <ul class="flex flex-col items-center justify-center w-full space-y-4">
        <LinkButton
          v-for="{ Link, Name, Orden } in data.linksPages"
          :key="Orden"
          :enlace="Link"
        >
          {{ Name }}
        </LinkButton>
      </ul>

      <p class="text-center text-black-coffee">
        Para contactarme, enviar un email a <br />
        <a
          href="mailto:dacolmenares93@gmail.com"
          target="_blank"
          class="font-bold text-primary"
        >
          dacolmenares93@gmail.com
        </a>
      </p>
    </section>
  </NuxtLayout>
</template>
