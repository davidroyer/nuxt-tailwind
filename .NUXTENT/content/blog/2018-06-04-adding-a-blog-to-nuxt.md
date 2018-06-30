---
title: Adding a Nuxtent-Powered Blog to My Nuxt Site
tags:
  - JavaScript
  - VueJS
  - Nuxt
  - Markdown
abstract: In this post, I survey markdown blogging options for Vue and React, and briefly describe the process of adding a blog to my Nuxt site using the currently unmaintained Nuxtent module.
---

### VuePress and Other Markdown Options in Vue and React

Evan You, the creator of Vue, introduced [VuePress](https://vuepress.vuejs.org/) just a couple months ago. I was excited about the announcement because it seemed to be exactly what I was looking for at the time: a minimalist, optimized, content-first static site generator that trivializes the process of fusing together markdown assets with dynamic layouts and components. I read through the docs and tried it out.

After completing the basic tutorial, I wanted so see if I could build a simple blog with it. I quickly found that a number of people were already on it, see [Blog Support roadmap, Vuepress Issue #36](https://github.com/vuejs/vuepress/issues/36). Evan You said the default theme was built for documentation sites but encouraged contributors to move forward with a blog theme:

![Evan You, VuePress Blog Support](https://dzwonsemrish7.cloudfront.net/items/3G3j29260w200Y1u0G3O/%5B8cdbeb5984a7e81a1535b59279988528%5D_Image+2018-06-04+at+9.36.11+AM.png?v=d1c9673a)

Since then, there have been attempts and they look promising. However, as someone relatively new to the world of front-end frameworks, I didn't want to rush into VuePress without first developing a better understanding of the existing options.

In React-land, I'm excited about Gatsby and Next, and I've tried them vicariously through building a few demos, following tutorials. But I have yet to really dig in, or understand why so many people are so opinionated about whether Next is better or Gatsby is better when it seems obvious that they were built for different purposes and happen to provide solutions for a shared subset of problems.

When I heard about VuePress, I was already aware of the [Nuxtent module](https://github.com/nuxt-community/nuxtent-module), but had some reservations about it as the project is no longer actively being maintained.

![Note from the creator of Nuxtent.](https://dzwonsemrish7.cloudfront.net/items/172Y2p3j1e0v2P2x281V/Image%202018-06-04%20at%2010.27.29%20AM.png?v=97f76b11)

My personal site is already running on Nuxt and I really wanted to add markdown blogging as soon as possible. Nuxtent seemed pretty simple to setup, so instead of rebuilding my site in Gatsby, Next, or VuePress, I decided to just give it a try.

### Project Setup

These were the steps I followed for adding Nuxtent to an existing Nuxt site:

* Install the Nuxtent Module

```bash
yarn add nuxtent
```

* Add `nuxtent` to the `modules` inside of the `module.exports` object of the `nuxt.config.js` file.

```js
  modules: ['nuxtent'],
```

* Create a `content/blog/` directory in the root project, and add a markdown file following this naming convention (the first part is the publication date, the second part is the post slug): `2018-06-04-adding-a-blog-to-nuxt.md`
* You can use YAML to create properties for the post

```md
---
title: Adding a Nuxtent-Powered Blog to My Nuxt Site
tags: JavaScript, VueJS, Nuxt, Nuxtent
abstract: In this post, I survey markdown blogging options for Vue and React, and briefly describe the process of adding a blog to my Nuxt site using the currently unmaintained Nuxtent module.
---

Evan You, the creator of Vue, introduced [VuePress](https://vuepress.vuejs.org/) just a couple months ago. I was excited about the announcement because it seemed to be exactly what I was looking for at the time: a minimalist, optimized, content-first static site generator that trivializes the process of fusing together markdown assets with dynamic layouts and components. I read through the docs and tried it out.
```

* To follow along, create a similar file in a directory named `content/demos`.
* Create `nuxtent.config.js` file inside the project root.
* You are required to export `content` and `api` objects.
* Nuxtent will actually accept an array of arrays if you want it to handle multiple content directories in separate routes, as in my example below. The first value of each array is the name of the directory. In this case, it will be able to look for markdown files in `content/demos` and `content/blog` and create separate api endpoints for each directory, using the base url specified by the `api.baseURL` value.

```js
// multiple content endpoints
module.exports = {
  content: [
    [
      "demos",
      {
        page: "/demos/_slug",
        permalink: "/demos/:slug",
        isPost: false,
        generate: ["get", "getAll"]
      }
    ],
    [
      "blog",
      {
        page: "/blog/_slug",
        permalink: "/blog/:year/:month/:day/:slug",
        isPost: true,
        generate: ["get", "getAll"]
      }
    ]
  ],
  api: {
    baseURL:
      process.env.NODE_ENV === "production"
        ? "http://www.thephilgray.com"
        : "http://localhost:3000"
  }
};
```

* Run or re-run the Nuxt dev server

```bash
yarn dev
```

* Nuxtent will generate a JSON api and can run it on the same port as your Nuxt dev server. If you're running your app on `http://localhost:3000`, you can navigate to this api at `http://localhost:3000/content-api/`. If you are using multiple content endpoints, you will see something like this:

```json
{ "content-endpoints": ["/demos", "/blog"] }
```

* Navigate to `http://localhost:3000/content-api/blog/`. The api will send you JSON array for any markdown files in your `content/blog` directory. It includes key/value pairs for the date and slug (derived from the original markdown filename) as well as for each property in the YAML front-matter, the body of the markdown converted to HTML, and the generated path and permalink.

```json
[
  {
    "title": "Adding a Nuxtent-Powered Blog to My Nuxt Site",
    "tags": "JavaScript, VueJS, Nuxt, Nuxtent",
    "abstract":
      "In this post, I survey markdown blogging options for Vue and React, and briefly describe the process of adding a blog to my Nuxt site using the currently unmaintained Nuxtent module.",
    "meta": {
      "index": 0,
      "fileName": "2018-06-04-adding-a-blog-to-nuxt.md",
      "section": "/",
      "dirName": "/blog"
    },
    "date": "2018-06-04",
    "path": "/blog/blog/2018/06/04/adding-a-blog-to-nuxt",
    "permalink": "/blog/2018/06/04/adding-a-blog-to-nuxt",
    "anchors": [
      [
        "#6-https-github-com-vuejs-vuepress-issues-36-evan-you-said-the-default-theme-was-built-for-documentation-sites-but-encouraged-contributors-to-move-forward-with-a-blog-theme",
        "6](https://github.com/vuejs/vuepress/issues/36). Evan You said the default theme was built for documentation sites but encouraged contributors to move forward with a blog theme:"
      ]
    ],
    "body":
      "<p>Evan You, the creator of Vue, introduced <a href=\"https://vuepress.vuejs.org/\">VuePress</a> just a couple months ago. I was excited about the announcement because it seemed to be exactly what I was looking for at the time: a minimalist, optimized, content-first static site generator that trivializes the process of fusing together markdown assets with dynamic layouts and components. I read through the docs and tried it out.</p>\n"
  }
]
```

If you're following along, you can navigate to the endpoint for the individual post here: `http://localhost:3000/content-api/blog/blog/2018/06/04/adding-a-blog-to-nuxt`.

You can play around with the `permalink` value in `nuxtent.config.js` to change the endpoint. Each time you make a change to the config file, make sure you re-run `yarn dev` as the api needs to be regenerated.

### Building Out the Blog Page Components

To actually consume the api in your app, you need build some Nuxt pages where they query the data.

Remember the `page` property in the content object/array of `nuxt.config.js`:

```js
page: '/blog/_slug',
```

Per Nuxt's implementation of [Vue-Router's](https://router.vuejs.org/guide/essentials/dynamic-matching.html) dynamic route matching, the `_slug` part can be called anything as long as it's prefixed by the underscore character. When you navigate to `http://localhost:3000/blog/2018/06/04/adding-a-blog-to-nuxt`, Nuxt will match the path `/blog/2018/06/04/adding-a-blog-to-nuxt` with `/blog/_slug` and render whatever file is in `pages` directory, specifically `pages/blog/_slug`.

* For the blog pages, create the following files `pages/blog/index.vue`, `pages/blog/_slug/index.vue`

```bash
pages
├── blog
│   ├── _slug
│   │   └── index.vue
│   ├── index.vue
├── demos
│   ├── _slug
│   │   └── index.vue
│   └── index.vue
├── index.vue
```

* In the `/blog/index.vue` page component, you want to get data for all of the blog posts, so specify `/blog` as the query and use the `getAll` method on the return object from the `$content` method of the `app`, the destructured Vue instance received by `asyncData`.

```html
<template>
  <div class="navbar">
    <logo></logo>
    <button
      @click="$store.commit('toggleMenuState')"
      class="nav-btn"
      v-text="navButtonText"
      :class="{'text-white font-bold': $store.state.menuIsActive}">
    </button>

    <template v-if="isMobile">
      <transition name="scale">
        <nav-links v-show="$store.state.menuIsActive" :links="links"></nav-links>
      </transition>
    </template>
    <nav-links v-if="!isMobile" :links="links"></nav-links>
  </div>
</template>

<script>
import NavLinks from "./NavLinks";
import Logo from "./Logo";

export default {
  name: "NavBar",
  components: {
    NavLinks,
    Logo
  },

  data: () => ({
    links: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
      { name: "Blog", path: "/blog" }
    ],
    windowWidth: 0,
    windowHeight: 0
  }),

  computed: {
    navButtonText() {
      return this.$store.state.menuIsActive ? "Close" : "Menu";
    },

    isMobile() {
      return this.windowWidth <= 767;
    }
  },

  mounted() {
    this.$nextTick(function() {
      window.addEventListener("resize", this.getWindowWidth);
      window.addEventListener("resize", this.getWindowHeight);

      //Init
      this.getWindowWidth();
      this.getWindowHeight();
    });
  },

  methods: {
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
    },

    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight;
    }
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
    window.removeEventListener("resize", this.getWindowHeight);
  }
};
</script>
```

`asyncData` is a special kind of Nuxt lifecycle hook that gets called before loading a page component, receiving the [`context`](https://nuxtjs.org/api/context) object, which includes the `app` object, or the root Vue instance. You can access plugins and all kinds of stuff from this root instance. The Nuxtent module adds a `$content` method to it. This method accepts a value for a path relative to the content-api and returns an object with additional methods on it to query the endpoint.

The `getAll` method, returns a promise that resolves with the JSON response that includes all the posts for the specified content endpoint. Another one, `get` accepts a string for the current route path and returns the JSON response for that specific post.

Whatever you return from `asyncData` will be merged with the component's `data` property before the page component is loaded.

* In the `/blog/_slug/index.vue` page component, you want to get data for only blog post that matches the current path, so again specify `/blog` as the initial query string, but this time use the `get` method, passing in `route.path`. You will also need to destructure `route` in addition to `app` from the `context` object in `asyncData` to get the route path information.

```vue
<template lang="pug">
article.fullPost
    h2.fullPost__title {{post.title}}
    p.fullPost__date {{post.date}}
    nuxtent-body.fullPost__body(:body="post.body")
</template>

<script>
// pages/blog/_slug/index.vue
export default {
  async asyncData({ app, route }) {
    return {
      post: await app.$content("/blog").get(route.path)
    };
  }
};
</script>
```

I think that's enough for this post. Next time, I might include some details about how I created dynamic page components for post tags and pagination, added syntax highlighting with [PrismJS](https://github.com/PrismJS/prism) for the code blocks, and setup commenting.

There's still much work to do to make it a production-worthy blog (and some refactoring) but I'm going to push it and start using it anyway.

You can browse the project repo here: [https://github.com/thephilgray/thephilgray](https://github.com/thephilgray/thephilgray).
