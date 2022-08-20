<script setup lang="ts">
const { data, pending } = await useLazyAsyncData("posts", () =>
  $fetch("/api/blog/get-post-publicados")
);

definePageMeta({
  title: "Daniel Colmenares - Blog",
});
</script>

<template>
  <NuxtLayout>
    <LoadingPage loadMessage="Cargando Publicaciones" v-if="pending" />

    <section v-else class="flex flex-col justify-center space-y-4 md:space-y-8">
      <UIHeader as="h1" customClass="text-primary">Última publicación</UIHeader>

      <BlogMainCard :post="data.posts.slice(0, 1)[0].properties" />

      <UIHeader as="h2" customClass="text-black-coffee">
        Publicaciones anteriores
      </UIHeader>

      <UIGrid>
        <BlogCard
          v-for="{ properties, id } in data.posts.slice(1)"
          :post="properties"
          :key="id"
        />
      </UIGrid>
    </section>
  </NuxtLayout>
</template>
