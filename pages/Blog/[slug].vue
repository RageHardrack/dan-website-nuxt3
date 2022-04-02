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

console.log(pending.value);
console.log({ check: data.value });

// const { content } = data.value;
const { properties } = data.value;

// definePageMeta({
//   title: computed(() => `Daniel Colmenares - ${data.value.properties.Post}`),
// });
</script>

<template>
  <NuxtLayout>
    <LoadingView loadMessage="Cargando Publicación" v-if="pending" />

    <section v-else class="flex flex-col justify-center space-y-8">
      <header class="flex flex-col space-y-4">
        <div class="w-full md:h-[40vh] overflow-hidden">
          <img
            :src="properties.Image_URL"
            :alt="`Banner ${properties.Post}`"
            class="object-bottom objet-cover"
          />
        </div>
        <Header as="h1">{{ properties.Post }}</Header>
        <p>Publicado el {{ properties.Fecha_Publicacion }}</p>
      </header>

      <Divider />

      <article
        class="flex flex-col justify-start flex-1 space-y-4 text-justify"
      >
        <!-- <Markdown v-for="(item, idx) in content" :key="idx" :item="item" /> -->
      </article>
    </section>
  </NuxtLayout>
</template>
