const Prism = require("prismjs");
const loadLanguages = require("prismjs/components/index.js");
const externalLinks = require("markdown-it-link-attributes");
const container = require("markdown-it-container");
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
      },
      plugins: [
        createContainer("tip", "TIP"),
        createContainer("warning", "WARNING"),
        createContainer("danger", "DANGER"),
        [externalLinks, { target: "_blank", rel: "noopener" }]
      ]
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

/**
 * Helper Function to create HTML for custom containers for markdown
 * @param  {[type]} klass        [description]
 * @param  {[type]} defaultTitle [description]
 * @return {[type]}              [description]
 */
function createContainer(klass, defaultTitle) {
  return [
    container,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx];
        const info = token.info
          .trim()
          .slice(klass.length)
          .trim();
        if (token.nesting === 1) {
          return `<div class="${klass} custom-block"><p class="custom-block-title">${info ||
            defaultTitle}</p>\n`;
        } else {
          return `</div>\n`;
        }
      }
    }
  ];
}
