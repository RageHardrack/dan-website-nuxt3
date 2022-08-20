<script setup lang="ts">
const route = useRoute();

const { slug } = route.params;
const { data, pending } = await useLazyAsyncData("/api/blog/get-post/", () =>
  $fetch(`/api/blog/get-post/${slug}`)
);

// TODO: Research Meta SEO for blogs
// definePageMeta({
//   title: computed(() => `Daniel Colmenares - ${data.value.properties.Post}`),
// });
</script>

<template>
  <NuxtLayout>
    <UILoadingView loadMessage="Cargando Publicación" v-if="pending" />

    <section v-else class="flex flex-col justify-center space-y-8">
      <header class="flex flex-col space-y-4">
        <picture class="w-full md:h-[400px] overflow-hidden">
          <img
            :src="data.properties.Image_URL"
            :alt="`Banner ${data.properties.Post}`"
            class="object-center objet-fill"
          />
        </picture>
        <UIHeader as="h1">{{ data.properties.Post }}</UIHeader>
        <p>Publicado el {{ data.properties.Fecha_Publicacion }}</p>
      </header>

      <UIDivider />

      <UIMarkdown :content="data.content" />
    </section>
  </NuxtLayout>
</template>
