<script setup lang="ts">
import type { ILink } from '~/interfaces';

const { data, status } = await useLazyAsyncData(
  'social-share-page',
  fetchLinksPage,
);

definePageMeta({
  title: 'Social Links',
  layout: 'social',
});
</script>

<template>
  <LoadingPage loadMessage="Loading" v-if="status === 'pending'" />

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
          src="~/assets/img/perfil.jpg"
          alt="Daniel Colmenares"
          class="aspect-square"
        />
      </picture>

      <Heading1 customClass="text-gold">Daniel Colmenares</Heading1>
      <Heading3 customClass="text-black-coffee">
        Fullstack Web Developer
      </Heading3>

      <Divider />
    </header>

    <ul class="flex flex-col items-center justify-center w-full space-y-4">
      <ButtonLinkExternal
        v-for="link in (data || [])"
        :key="link.Orden || link.id"
        :enlace="link.Link"
      >
        {{ link.Name }}
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
</template>
