<template>
  <main-wrapper>
    <IntroBlock :tag="1" text="Blog">Here is where the main blog page will be for all the posts in information.</IntroBlock>
    <ul>
        <li v-for="post in posts" :key="post.permalink">
            <nuxt-link :to="post.permalink">{{ post.linktitle || post.title }}</nuxt-link>
        </li>
    </ul>
  </main-wrapper>  
</template>

<script>
import MainWrapper from "~/components/Layout/MainWrapper";
import IntroBlock from "~/components/Layout/IntroBlock";
// import Card from "~/components/Layout/Card";

export default {
  components: {
    MainWrapper,
    IntroBlock
  },
  async asyncData({ app, route }) {
    const posts = await app.$content("/").getAll();
    return { posts };
  }
};
</script>
