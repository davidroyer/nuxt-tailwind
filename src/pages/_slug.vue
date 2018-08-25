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
  async asyncData({ params, payload }) {
    if (payload) return { page: payload }
    else {
      let { page } = await app.$wp.page(params.slug)
      return { page }
    }
  },
  head() {
    return {
      title: this.page.title.rendered
    }
  }
}
</script>
