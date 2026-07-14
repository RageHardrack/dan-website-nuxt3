<script setup lang="ts">
import { watch } from "vue";

const route = useRoute();
const { slug } = route.params;

const { data, pending } = await useLazyFetch<any>(`/api/blog/${slug}`);

watch(data, (newData) => {
  if (newData) {
    const seoMeta: any = {
      title: `${newData.Post} - Daniel Colmenares`,
      ogTitle: `${newData.Post} - Daniel Colmenares`,
      description: newData.Brief || "Publicación del blog de Daniel Colmenares",
      ogDescription: newData.Brief || "Publicación del blog de Daniel Colmenares",
      ogImage: newData.Image_URL,
      twitterCard: "summary_large_image",
    };

    if (newData.Prevent_Index) {
      seoMeta.robots = "noindex, nofollow";
    }

    useSeoMeta(seoMeta);
  }
}, { immediate: true });
</script>

<template>
  <LoadingPage loadMessage="Cargando Publicación" v-if="pending" />

  <section v-else-if="data" class="flex flex-col justify-center space-y-8">
    <header class="flex flex-col w-full space-y-4">
      <NuxtLink
        to="/blog"
        class="inline-flex items-center font-semibold underline transition duration-300 text-electric hover:text-secondary self-start"
      >
        &larr; Volver al Blog
      </NuxtLink>

      <picture class="w-full md:h-[400px] overflow-hidden rounded-lg shadow-md" v-if="data.Image_URL">
        <img
          :src="data.Image_URL"
          :alt="`Banner ${data.Post}`"
          class="object-cover object-center w-full h-full"
        />
      </picture>
      <Heading1>{{ data.Post }}</Heading1>
      <p class="text-sm text-gray-500">
        Publicado el
        {{ $dayjs(data.Fecha_Publicacion).format("DD MMMM YYYY") }}
      </p>
    </header>

    <Divider />
    
    <main class="w-full">
      <Markdown :content="data.content" />
    </main>
  </section>
</template>
