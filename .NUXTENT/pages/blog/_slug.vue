<template>
  <main-wrapper>
    <nuxt-link to="/">Home</nuxt-link> /
    <nuxt-link to="/blog">Blog</nuxt-link> /
    {{ post.linktitle }}
    <h1 class="post-title">{{ post.title }} </h1>
    <nuxtent-body class="content" :body="post.body" />
  </main-wrapper>
</template>

<script>
import MainWrapper from "@/components/Layout/MainWrapper";
const metaDescription = 'Get description from blog post'

export default {
  components: {
    MainWrapper
  },
  head() {
    return {
      title: "Blog",
      meta: [
        {
          hid: "description",
          name: "description",
          content: metaDescription
        },
        {
          hid: "og:description",
          property: "og:description",
          content: metaDescription
        },
        {
          hid: "og:type",
          property: "og:type",
          content: 'article'
        }
      ],
      link: [
        {
          rel: "stylesheet",
          href:
            "https://cdnjs.cloudflare.com/ajax/libs/prism/1.14.0/themes/prism-tomorrow.css"
        }
      ]
    };
  }
  async asyncData({ app, route, payload }) {
    const post = payload || (await app.$content("/blog").get(route.path));
    return { post };
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
