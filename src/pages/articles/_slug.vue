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
  // async asyncData ({ params, error, payload }) {
  //   if (payload) return { user: payload }
  //   else return { user: await backend.fetchUser(params.id) }
  // }

  async asyncData({ app, store, params, payload }) {
    let dataArray
    let { post } = await wp.post(params.slug)

    if (payload) return { article: payload, post }
    else {
      dataArray = await app.$wp.posts().slug(params.slug)
      return {
        article: dataArray[0],
        post
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
