<script setup lang="ts">
const { data, pending } = await useLazyAsyncData("links", () =>
  $fetch("/api/links")
);

definePageMeta({
  title: "Social Links",
});
</script>

<template>
  <NuxtLayout name="social">
    <LoadingPage loadMessage="Loading" v-if="pending" />

    <section
      class="container flex flex-col items-center justify-center min-h-screen space-y-4 md:space-y-8"
      v-else
    >
      <header
        class="flex flex-col items-center justify-center w-full space-y-4 md:w-1/2"
      >
        <picture
          class="flex overflow-hidden border-4 rounded-full w-52 h-52 md:w-72 md:h-72 border-gold"
        >
          <img
            src="~~/assets/img/perfil.jpg"
            alt="Daniel Colmenares"
            class="aspect-square"
          />
        </picture>

        <Heading1 customClass="text-gold">Daniel Colmenares</Heading1>
        <Heading3 customClass="text-black-coffee"> Web Developer </Heading3>

        <Divider />
      </header>

      <ul class="flex flex-col items-center justify-center w-full space-y-4">
        <ButtonLinkExternal
          v-for="{ Link, Name, Orden } in data.linksPages"
          :key="Orden"
          :enlace="Link"
        >
          {{ Name }}
        </ButtonLinkExternal>
      </ul>

      <p class="text-center text-black-coffee">
        Contact me: <br />
        <a
          href="mailto:dacolmenares93@gmail.com"
          target="_blank"
          class="font-bold text-primary"
          rel="nofollow"
        >
          dacolmenares93@gmail.com
        </a>
      </p>
    </section>
  </NuxtLayout>
</template>
