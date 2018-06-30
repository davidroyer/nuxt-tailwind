<template>
<div class="container px-4 mx-auto max-w-xl">
  <IntroBlock :tag="1" text="Blog">Here is where the main blog page will be for all the posts in information.</IntroBlock>
  <ul class="my-6 py-4 post-list flex flex-wrap justify-between">
    <li v-for="(post, index) in posts" :key="index" class="mx-4 my-4">
      <nuxt-link class="font-semibold" :to="post.permalink">{{ post.title }}</nuxt-link>
      <div class="tags flex">
        <div class="tag text-sm mr-4" v-for="(postTag, index) in post.tags" :key="index">
          <nuxt-link class="tag-link no-underline font-bold" :to="'/tags/' + postTag | slugify">
            <font-awesome-icon :icon="['fas', 'tag']" style="font-size: 12px"/> {{postTag}}
          </nuxt-link>
        </div>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import MainWrapper from "~/components/Layout/MainWrapper";
import IntroBlock from "~/components/Layout/IntroBlock";

export default {
  components: {
    MainWrapper,
    IntroBlock
  },
  async asyncData({ app, route }) {
    const posts = await app.$content("/blog").getAll();
    return {
      posts
    };
  }
};
</script>
