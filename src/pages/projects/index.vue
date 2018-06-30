<template>
<div class="container px-4 mx-auto max-w-xl">
  <IntroBlock :tag="1" text="Projects">Here are some projects that I'm proud of.</IntroBlock>
  <ul class="my-6 py-4 post-list flex flex-wrap justify-between">
    <li v-for="(project, index) in projects" :key="index" class="mx-4 my-4">
      <nuxt-link class="font-semibold" :to="project.permalink">{{ project.title }}</nuxt-link>
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
    const projects = await app.$content("/projects").getAll();
    return {
      projects
    };
  }
};
</script>
