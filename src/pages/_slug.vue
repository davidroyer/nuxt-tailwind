<template>
  <v-wrapper>
    <h1 v-html="page.title.rendered"></h1>
    <main class="content" v-html="page.content.rendered">
    </main>

  </v-wrapper>
</template>

<script>
export default {
  async asyncData({ app, store, params, payload }) {
    let pageArray

    if (payload) pageArray = payload
    else pageArray = await app.$wp.pages().slug(params.slug)

    return {
      page: pageArray[0]
    }
  },
  head() {
    return {
      title: 'Catch Patch'
    }
  }
}
</script>
