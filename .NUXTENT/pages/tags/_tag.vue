<template lang="html">
  <div class="container px-4 mx-auto max-w-xl">
      <h1 class="text-center">Tags Page</h1>
      <h2 class="text-center">
        <font-awesome-icon :icon="['fas', 'tag']" style="font-size: 18px"/>Tag: <span class="font-light" v-text="$route.params.tag"></span>
      </h2>
      <hr/>
      <ul class="my-6 py-4 post-list flex flex-wrap justify-between">
        <li v-for="(post, index) in taggedPosts" :key="index" class="mx-4 my-4">
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
import MainWrapper from "@/components/Layout/MainWrapper";
import { slugFilter } from "@/utilities/filters.js";
import { getPostsFromTag } from "@/utilities/helpers.js";

export default {
  components: {
    MainWrapper
  },

  async asyncData({ app }) {
    const allPosts = await app.$content("/blog").getAll();
    const { tag } = app.context.route.params;

    return {
      taggedPosts: getPostsFromTag(allPosts, tag)
    };
  }
};
</script>
