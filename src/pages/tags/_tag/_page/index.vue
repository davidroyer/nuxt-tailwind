<template lang="html">
  <div>
      <h2>Tag: {{$route.params.tag}}</h2>
      <p>Page {{$route.params.page}} of {{numberOfPages}}</p>
      <hr/>
      <div :posts="tagPosts" :currentPage="Number($route.params.page || 1)" :relativePath="'/tags/' + $route.params.tag + '/'"></div>
  </div>
</template>
<script>
import { slugFilter } from "@/lib/filters.js";

// import Blog from '@/layouts/blog';
export default {
  components: {
    // Blog
  },
  async asyncData({ app, redirect }) {
    const allDocs = await app.$content("/blog").getAll();
    const { tag, page } = app.context.route.params;

    const tagPosts = allDocs.filter(doc =>
      doc.tags
        .split(",")
        .map(tag => slugFilter(tag))
        .includes(tag)
    );
    const numberOfPages = Math.ceil(allDocs.length / 5);

    // redirect to the tag page if user attempts to navigate to a page that does not exist
    if (page > numberOfPages) {
      redirect("/tags/" + tag);
    }

    return {
      tagPosts,
      numberOfPages
    };
  }
};
</script>
