<template>
  <v-wrapper>
    <v-intro :tag="1" text="Tailwind styleguide with NuxtJS NEW!!!">
      It's a real pleasure to have you here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, similique atque doloribus consectetur error voluptatem esse rerum repellat temporibus voluptatum labore excepturi minus eius cumque quasi inventore at alias repellendus.
    </v-intro>
    <div class="pages">
      <div class="page" v-for="(page, index) in pages" :key="index">
        <h3><nuxt-link :to="`/${page.slug}`" v-html="page.title.rendered"></nuxt-link></h3>
      </div>
    </div>
  </v-wrapper>
</template>

<script>
import wp from '~/lib/wp'

export default {
  async asyncData({ app, store, params }) {
    const ip = await app.$axios.$get('http://icanhazip.com')
    const testPages = await app.$axios.$get('/api/wp/v2/pages')
    const { posts } = await wp.posts()
    const { pages } = await wp.pages()

    return {
      ip,
      testPages,
      pages,
      articles: posts
    }
  },
  head() {
    return {
      title: 'Home'
    }
  }
}
</script>
