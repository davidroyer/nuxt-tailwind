<template>
  <v-wrapper>
    <div class="posts">
      <h2>Posts</h2>
      <div class="post" v-for="(post, index) in posts" :key="index">
        <h3><nuxt-link :to="`/posts/${post.slug}`" v-html="post.title.rendered"></nuxt-link></h3>
      </div>
    </div>
    <br><hr>
    <div class="pages">
      <h2>Pages</h2>
      <div class="page" v-for="(page, index) in pages" :key="index">
        <h3><nuxt-link :to="`/${page.slug}`" v-html="page.title.rendered"></nuxt-link></h3>
      </div>
    </div>
  </v-wrapper>
</template>

<script>
export default {
  async asyncData({ app, store, params }) {
    const pages = await app.$axios.$get('/api/wp/v2/pages')
    const posts = await app.$axios.$get('/api/wp/v2/posts')
    return {
      pages,
      posts
    }
  },
  head() {
    return {
      title: 'Tests Page'
    }
  }
}
</script>
