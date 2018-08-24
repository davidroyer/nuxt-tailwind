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
import wp from '~/lib/wp'

export default {
  async asyncData({ params, payload }) {
    if (payload) return { article: payload }
    else {
      let { post } = await wp.post(params.slug)
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
