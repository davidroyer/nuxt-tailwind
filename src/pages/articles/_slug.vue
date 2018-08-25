<template>
  <v-wrapper>
    <template v-if="article">
      <h1 v-html="article.title.rendered"></h1>
      <main class="content" v-html="article.content.rendered">
      </main>
    </template>

  </v-wrapper>
</template>

<script>
export default {
  async asyncData({ app, params, payload }) {
    if (payload) return { article: payload }
    else {
      let { post } = await app.$wp.post(params.slug)
      return {
        article: post
      }
    }
  },

  head() {
    return {
      title: this.article.title.rendered
    }
  }
}
</script>
