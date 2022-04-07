<script setup lang="ts">
import LoadingView from "~~/components/Layout/LoadingView.vue";
import Header from "~~/components/Typography/Header.vue";
import Divider from "~~/components/Layout/Divider.vue";
import Markdown from "~~/components/Layout/Markdown.vue";

const route = useRoute();

const { slug } = route.params;
const { data, pending } = await useLazyAsyncData("/api/blog/get-post/", () =>
  $fetch(`/api/blog/get-post/${slug}`)
);

// definePageMeta({
//   title: computed(() => `Daniel Colmenares - ${data.value.properties.Post}`),
// });
</script>

<template>
  <NuxtLayout>
    <LoadingView loadMessage="Cargando Publicación" v-if="pending" />

    <section v-else class="flex flex-col justify-center space-y-8">
      <header class="flex flex-col space-y-4">
        <div class="w-full md:h-[400px] overflow-hidden">
          <img
            :src="data.properties.Image_URL"
            :alt="`Banner ${data.properties.Post}`"
            class="object-bottom objet-cover"
          />
        </div>
        <Header as="h1">{{ data.properties.Post }}</Header>
        <p>Publicado el {{ data.properties.Fecha_Publicacion }}</p>
      </header>

      <Divider />

      <Markdown :content="data.content" />
    </section>
  </NuxtLayout>
</template>
