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
export default {
  async asyncData({ app }) {
    const { posts } = await app.$wp.posts()
    const { pages } = await app.$wp.pages()

    return {
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
