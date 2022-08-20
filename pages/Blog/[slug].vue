<script setup lang="ts">
const route = useRoute();
import dayjs from "dayjs";

const { slug } = route.params;
const { data, pending, refresh } = await useLazyAsyncData("content", () =>
  $fetch(`/api/blog/get-post/${slug}`)
);

// TODO: Research Meta SEO for blogs
refresh();
// definePageMeta({
//   title: `Daniel Colmenares - ${data?.value.properties.Post || ""}`,
// });
</script>

<template>
  <NuxtLayout>
    <LoadingPage loadMessage="Cargando Publicación" v-if="pending" />

    <section v-else class="flex flex-col justify-center space-y-8">
      <header class="flex flex-col w-full space-y-4">
        <picture class="w-full md:h-[400px] overflow-hidden">
          <img
            :src="data.properties.Image_URL"
            :alt="`Banner ${data.properties.Post}`"
            class="object-fill object-center w-full"
          />
        </picture>
        <Heading1>{{ data.properties.Post }}</Heading1>
        <p>
          Publicado el
          {{ dayjs(data.properties.Fecha_Publicacion).format("DD MMMM YYYY") }}
        </p>
      </header>

      <Divider />

      <Markdown :content="data.content" />
    </section>
  </NuxtLayout>
</template>
