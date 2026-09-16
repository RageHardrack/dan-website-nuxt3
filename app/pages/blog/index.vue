<script setup lang="ts">
const { locale } = useI18n();

const { data, status, refresh, error } = await useLazyAsyncData(
  'blog-page',
  () => fetchBlogPage(locale.value),
  { watch: [locale] },
);

definePageMeta({
  title: 'Blog',
});
</script>

<template>
  <LoadingPage :loadMessage="$t('blog.loading')" v-if="status === 'pending'" />

  <ErrorMessage
    v-else-if="status === 'error' || Boolean(error) || data?.hasError"
    @retry="refresh"
  />

  <section v-else class="flex flex-col justify-center space-y-4 md:space-y-8">
    <Heading1 customClass="text-primary">
      {{ $t('blog.latestPost') }}
    </Heading1>

    <BlogMainCard
      v-if="data?.posts && data.posts.length > 0 && data.posts[0]"
      :post="data.posts[0]"
    />

    <Heading2 customClass="text-black-coffee">
      {{ $t('blog.previousPosts') }}
    </Heading2>

    <Grid size="lg" v-if="data?.posts && data.posts.length > 1">
      <CardBlog
        v-for="post in data.posts.slice(1)"
        :post="post"
        :key="post.id"
      />
    </Grid>
  </section>
</template>
