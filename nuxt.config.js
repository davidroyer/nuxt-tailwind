const path = require("path");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const glob = require("glob-all");
const isProduction = process.env.NODE_ENV === "production";
const baseUrl = isProduction
  ? "https://nuxtent--nuxt-tailwind.netlify.com"
  : "http://localhost:3000";
const tailwind = require("./tailwind");
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:/]+/g) || [];
  }
}

const purgecssWhitelistPatterns = [
  /^__/,
  /^fa/,
  /^page-/,
  /^nuxt/,
  /^scale/,
  /^enter/,
  /^leave/,
  /^custom-block/,
  /^custom-block-/
];

module.exports = {
  /**
   * Custom source and build directories
   * @see https://nuxtjs.org/api/configuration-srcdir
   * @see https://nuxtjs.org/api/configuration-builddir
   */
  srcDir: "./src",
  buildDir: "./build",

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
    color: tailwind.colors["red"]
  },

  /**
   * Custom Nuxt plugins
   * @see https://nuxtjs.org/guide/plugins
   */
  plugins: ["~/plugins/global-components", { src: "~/plugins/filters" }],

  /**
   * Custom Nuxt modules
   * @see https://nuxtjs.org/guide/modules/
   * @see https://pwa.nuxtjs.org/
   */
  modules: ["@nuxtjs/sitemap", "nuxt-fontawesome", "nuxtent"],

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
      },
      {
        set: "@fortawesome/fontawesome-free-solid",
        icons: ["faTag"]
      }
    ]
  },

  generate: {
    fallback: true
  },

  /**
   * Sitemap
   * @see https://github.com/nuxt-community/sitemap-module
   */
  sitemap: {
    hostname: baseUrl,
    generate: true
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
      config.resolve.alias["@fortawesome/fontawesome-free-solid$"] =
        "@fortawesome/fontawesome-free-solid/shakable.es.js";

      if (!isDev) {
        config.plugins.push(
          new PurgecssPlugin({
            // purgecss configuration
            // https://github.com/FullHuman/purgecss
            keyframes: false,
            paths: glob.sync([
              path.join(__dirname, "./src/pages/**/*.vue"),
              path.join(__dirname, "./src/layouts/**/*.vue"),
              path.join(__dirname, "./src/components/**/*.vue")
            ]),
            extractors: [
              {
                extractor: TailwindExtractor,
                extensions: ["html", "js", "vue", "css"]
              }
            ],
            whitelist: ["html", "body", "ol", "tip", "warning", "danger"],
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
