<template>
  <v-wrapper>
    <h1 v-html="article.title.rendered"></h1>
    <main class="content" v-html="article.content.rendered">
    </main>

  </v-wrapper>
</template>

<script>
import wp from '~/lib/wp'

export default {
  async asyncData({ app, store, params, payload }) {
    let dataArray
    let { post } = await wp.post(params.slug)
    if (payload) dataArray = payload
    else dataArray = await app.$wp.posts().slug(params.slug)

    return {
      article: dataArray[0],
      post
    }
  },
  head() {
    return {
      title: this.article.title.rendered
    }
  }
}
</script>
