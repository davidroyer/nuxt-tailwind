const path = require('path')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:/]+/g) || []
  }
}
const purgecssWhitelistPatterns = [
  /^page-/,
  /^nuxt-/,
  /^slide-/
]

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "tailwind-documentation",
    meta: [{
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "Nuxt.js project"
      }
    ],
    link: [{
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico"
    }],
    bodyAttrs: {
      class: "font-sans leading-normal"
    }
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: "#9561e2"
  },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    postcss: [
      require('tailwindcss')('./tailwind.js'),
      require('autoprefixer')
    ],
    extend(config, {
      isDev,
      isClient
    }) {
      if (!isDev) {
        config.plugins.push(
          new PurgecssPlugin({
            // purgecss configuration
            // https://github.com/FullHuman/purgecss
            paths: glob.sync([
              path.join(__dirname, './pages/**/*.vue'),
              path.join(__dirname, './layouts/**/*.vue'),
              path.join(__dirname, './components/**/*.vue')
            ]),
            extractors: [{
              extractor: TailwindExtractor,
              extensions: ['vue']
            }],
            whitelist: ['html', 'body', 'nuxt-progress', 'page-enter', 'page-enter-active', 'page-leave', 'page-leave-active'],
            whitelistPatterns: purgecssWhitelistPatterns
          })
        )
      }
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },
  css: [
    "~/assets/scss/main.scss",
  ],

  router: {
    middleware: ['menu']
  }
};
