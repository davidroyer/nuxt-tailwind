<template>
  <v-wrapper>
    <v-intro :tag="1" text="Tailwind styleguide with NuxtJS NEW!!!">
      It's a real pleasure to have you here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, similique atque doloribus consectetur error voluptatem esse rerum repellat temporibus voluptatum labore excepturi minus eius cumque quasi inventore at alias repellendus.
    </v-intro>
    <div class="articles">
      <div class="article" v-for="(article, index) in articles" :key="index">
        <h3><nuxt-link :to="`/articles/${article.slug}`" v-html="article.title.rendered"></nuxt-link></h3>
      </div>
    </div>
  </v-wrapper>
</template>

<script>
export default {
  async asyncData({ app, store, params }) {
    const { posts } = await app.$wp.posts()
    return {
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
