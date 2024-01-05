<script setup lang="ts">
const route = useRoute();

const { slug } = route.params;
const { data, pending } = await useLazyFetch(`/api/blog/${slug}`
);

// TODO: Research Meta SEO for blogs
// definePageMeta({
//   title: `${data?.value.properties.Post || ""}`,
// });
</script>

<template>
  <LoadingPage loadMessage="Cargando Publicación" v-if="pending" />

  <section v-else class="flex flex-col justify-center space-y-8">
    <header class="flex flex-col w-full space-y-4">
      <picture class="w-full md:h-[400px] overflow-hidden">
        <img
          :src="data!.Image_URL"
          :alt="`Banner ${data!.Post}`"
          class="object-fill object-center w-full"
        />
      </picture>
      <Heading1>{{ data!.Post }}</Heading1>
      <p>
        Publicado el
        {{ $dayjs(data!.Fecha_Publicacion).format("DD MMMM YYYY") }}
      </p>
    </header>

    <Divider />
    
    <Markdown :content="data!.content" />
  </section>
</template>
