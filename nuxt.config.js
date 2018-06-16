const path = require("path");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const glob = require("glob-all");

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:/]+/g) || [];
  }
}
const purgecssWhitelistPatterns = [/^page-/, /^nuxt-/, /^-enter/, /^-leave/];

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "Nuxt Tailwind Starter - David Royer Website",
    meta: [
      {
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
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      }
    ],
    bodyAttrs: {
      class: "font-sans leading-normal"
    }
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: "#6574cd"
  },

  /**
   * Custom Nuxt plugins
   * @see https://nuxtjs.org/guide/plugins
   */
  plugins: ["~/plugins/global-components"],

  /**
   * Custom Nuxt modules
   * @see https://nuxtjs.org/guide/modules/
   * @see https://pwa.nuxtjs.org/
   */
  modules: ["@nuxtjs/sitemap", "nuxt-fontawesome"],

  /**
   * Font awsome icons
   * @see https://github.com/vaso2/nuxt-fontawesome
   */
  fontawesome: {
    imports: [
      {
        set: "@fortawesome/fontawesome-free-brands",
        icons: ["faGithub", "faTwitter", "faLinkedinIn"]
      },
      {
        set: "@fortawesome/fontawesome-free-regular",
        icons: ["faBell"]
      }
    ]
  },

  /**
   * Sitemap
   * @see https://github.com/nuxt-community/sitemap-module
   */
  // sitemap: {
  //   path: '/sitemap.xml',
  //   hostname: config.url,
  //   generate: true
  // },
  sitemap: {
    hostname: "https://nuxt-tailwind.netlify.com/",
    generate: true
    // gzip: false,
    // exclude: [
    //   '/404',
    // ],
    // routes: generateDynamicRoutes,
  },

  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,

    postcss: [require("tailwindcss")("./tailwind.js"), require("autoprefixer")],

    extend(config, { isDev, isClient }) {
      /**
       * Enable tree shaking for FontAwsome
       */

      config.resolve.alias["@fortawesome/fontawesome-free-brands$"] =
        "@fortawesome/fontawesome-free-brands/shakable.es.js";
      config.resolve.alias["@fortawesome/fontawesome-free-regular$"] =
        "@fortawesome/fontawesome-free-regular/shakable.es.js";

      if (!isDev) {
        config.plugins.push(
          new PurgecssPlugin({
            // purgecss configuration
            // https://github.com/FullHuman/purgecss
            paths: glob.sync([
              path.join(__dirname, "./pages/**/*.vue"),
              path.join(__dirname, "./layouts/**/*.vue"),
              path.join(__dirname, "./components/**/*.vue")
            ]),
            extractors: [
              {
                extractor: TailwindExtractor,
                extensions: ["html", "js", "vue", "css"]
              }
            ],
            whitelist: [
              "html",
              "body",
              "nuxt-progress",
              "page-enter",
              "page-enter-active",
              "page-leave",
              "page-leave-active"
            ],
            whitelistPatterns: purgecssWhitelistPatterns
          })
        );
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
  css: ["~/assets/scss/main.scss"],

  router: {
    middleware: ["menu"]
  }
};
