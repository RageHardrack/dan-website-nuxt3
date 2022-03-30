<script setup lang="ts">
import MainBlogCard from "~~/components/Pages/Blog/MainBlogCard.vue";
import LoadingView from "~~/components/Layout/LoadingView.vue";
import BlogCard from "~~/components/Pages/Blog/BlogCard.vue";
import Header from "~~/components/Typography/Header.vue";
import Grid from "~~/components/Layout/Grid.vue";

const { data, pending } = await useLazyAsyncData("posts", () =>
  $fetch("/api/blog/get-post-publicados")
);

definePageMeta({
  title: "Daniel Colmenares - Blog",
});
</script>

<template>
  <NuxtLayout>
    <LoadingView loadMessage="Cargando Publicaciones" v-if="pending" />

    <section v-else class="flex flex-col justify-center space-y-4 md:space-y-8">
      <Header as="h1" customClass="text-primary">Última publicación</Header>

      <MainBlogCard :post="data.posts.slice(0, 1)[0].properties" />

      <Header as="h2" customClass="text-black-coffee">
        Publicaciones anteriores
      </Header>

      <Grid>
        <BlogCard
          v-for="{ properties, id } in data.posts.slice(1)"
          :post="properties"
          :key="id"
        />
      </Grid>
    </section>
  </NuxtLayout>
</template>
