const Prism = require("prismjs");
const loadLanguages = require("prismjs/components/index.js");
// const markdownPlugins = {
//   attrs: require("markdown-it-attrs"),
//   figures: [require("markdown-it-implicit-figures"), { figcaption: true }],
//   video: require("markdown-it-video")
// };

loadLanguages(["json"]);

module.exports = {
  content: [
    [
      "projects",
      {
        page: "/projects/_slug",
        permalink: "/projects/:slug",
        isPost: false,
        generate: ["get", "getAll"]
      }
    ],

    [
      "blog",
      {
        page: "/blog/_slug",
        permalink: "/blog/:slug",
        isPost: true,
        anchorLevel: 4,
        generate: ["get", "getAll"]
      }
    ]
  ],

  parsers: {
    md: {
      extend(config) {
        config.highlight = (code, lang) => {
          return `<pre class="language-${lang}"><code class="language-${lang}">${Prism.highlight(
            code,
            Prism.languages[lang] || Prism.languages.markup
          )}</code></pre>`;
        };
      }
    }
  },

  api: function(isStatic) {
    return {
      baseURL: "http://localhost:3000",
      browserBaseURL: isStatic
        ? "https://nuxtent--nuxt-tailwind.netlify.com"
        : ""
    };
  }
};
