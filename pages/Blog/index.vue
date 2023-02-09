<script setup lang="ts">
const { data, pending } = await useLazyFetch("/api/blog");

definePageMeta({
  title: "Blog",
});
</script>

<template>
  <LoadingPage loadMessage="Loading posts" v-if="pending" />

  <section v-else class="flex flex-col justify-center space-y-4 md:space-y-8">
    <Heading1 customClass="text-primary"> Última publicación </Heading1>

    <BlogMainCard :post="data!.posts.slice(0, 1)[0]" />

    <Heading2 customClass="text-black-coffee">
      Publicaciones anteriores
    </Heading2>

    <Grid size="lg">
      <CardBlog
        v-for="post in data!.posts.slice(1)"
        :post="post"
        :key="post.id"
      />
    </Grid>
  </section>
</template>
