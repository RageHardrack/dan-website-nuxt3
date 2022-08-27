<script setup lang="ts">
const { data, pending } = await useLazyAsyncData("posts", () =>
  $fetch("/api/blog")
);

definePageMeta({
  title: "Blog",
});
</script>

<template>
  <NuxtLayout>
    <LoadingPage loadMessage="Loading posts" v-if="pending" />

    <section v-else class="flex flex-col justify-center space-y-4 md:space-y-8">
      <Heading1 customClass="text-primary">Última publicación</Heading1>

      <BlogMainCard :post="data.posts.slice(0, 1)[0].properties" />

      <Heading2 customClass="text-black-coffee">
        Publicaciones anteriores
      </Heading2>

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
