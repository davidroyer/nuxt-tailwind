<template>
  <v-wrapper>
    <template v-if="page">
      <h1 v-html="page.title.rendered"></h1>
      <main class="content" v-html="page.content.rendered">
      </main>
    </template>

  </v-wrapper>
</template>

<script>
export default {
  async asyncData({ app, store, params, payload }) {
    let pageArray

    if (payload) return { page: payload }
    else {
      pageArray = await app.$wp.pages().slug(params.slug)
      return {
        page: pageArray[0]
      }
    }
  },
  head() {
    return {
      title: 'Catch Patch'
    }
  }
}
</script>
