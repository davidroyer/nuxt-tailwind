---
title: Tips After Building a Site with Nuxt.js
description: A few simple tips for anyone using Nuxt.js. This includes covering how to handle mobile menu state once a link is choosen from the menu and making sure to close the menu when appropriate.
tags:
  - vue
  - nuxt
---

# Tip 1 - Learn Vuex

I put off on learning Vuex for a long time, and used simpler ways of handling global state. When I took the time to understand Vuex though, it paid off greatly when working with Nuxt.js.

# Tip 2 - Using Middleware for Mobile Menus

When a link was clicked using the mobile menu, it would stay open instead of closing before transitioning routes. I wanted the menu to close on route change.

A couple things needed to happen to accomplish this. (_Disclaimer: I am using Vuex for state management_)

1. Use Vuex to keep track of my menu state.

```js
state: {
  menuIsActive: false
},
mutations: {
  toggleMenuState (state) {
    state.menuIsActive = !state.menuIsActive
  }
}
```

2. Add a function to the `middleware` directory. It checks if the menu is active. If so, toggle that state (making it inactive).

```js
// This is `middleware/menu.js`

export default function({ store }) {
  if (store.state.menuIsActive === true) {
    store.commit("toggleMenuState");
  }
}
```

3. Register this middleware to run when the route changes by adding it inside `nuxt.config.js`. It is set to `menu` because our middleware file name is `menu.js`.

```js
router: {
  middleware: "menu";
}
```

# Tip 3 - Performance

I personally believe using the <a target="/\_blank" rel="noopener" href=https://github.com/nuxt-community/modules/tree/master/modules/pwa>PWA Module</a> is the easiest modification one can do for the biggest impact on his/her site. While customization is possible, it's not required. All that's needed to begin reaping the benefits is adding 1 line to the modules sections of `nuxt.config.js` like so:

```js
// `nuxt.config.js`

module.exports = {
  modules: ["@nuxtjs/pwa"]
};
```

Also, I wanted to use a Google font via CDN but received a performance warning when testing with <a target="/\_blank" rel="noopener" href=https://developers.google.com/web/tools/lighthouse/>Lighthouse</a>. I was able to eliminate the warning by preloading the font in `nuxt.config.js`.

**Example:**

```js
// `nuxt.config.js`

module.exports = {
  head: {
    link: [
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css?family=Roboto"
      }
    ]
  }
};
```
