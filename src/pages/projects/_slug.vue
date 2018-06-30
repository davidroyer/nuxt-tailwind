<template>
  <main-wrapper>
    <nuxt-link to="/">Home</nuxt-link> /
    <nuxt-link to="/projects">Projects</nuxt-link> /
    <!-- {{ project.linktitle }} -->
    <h1 class="post-title project-title">{{ project.title }} </h1>
    <nuxtent-body class="content" :body="project.body" />
  </main-wrapper>
</template>

<script>
import MainWrapper from "@/components/Layout/MainWrapper";

export default {
  components: {
    MainWrapper
  },
  head: {
    link: [
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/prism/1.14.0/themes/prism-tomorrow.css"
      }
    ]
  },

  async asyncData({ app, route, payload }) {
    const project =
      payload || (await app.$content("/projects").get(route.path));
    return { project };
  }
};
</script>

<style>
pre {
  border-radius: 6px;
}
.line-number,
code,
kbd {
  font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace !important;
  font-size: 0.85em !important;
}
:not(pre) > code[class*="language-"],
pre[class*="language-"] {
  line-height: 1.4;
  padding: 1.25rem 1.5rem;
  /* margin: 0.85rem 0; */
  background: transparent;
  overflow: auto;
  /* color: #292c34; */
  background-color: #282c34;
}

.content code {
  color: #476582;
  padding: 0.25rem 0.5rem;
  margin: 0;
  font-size: 0.85em;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
}

.content code[class*="language-"],
pre[class*="language-"] code {
  color: #f1f1f1 !important;
}
</style>
