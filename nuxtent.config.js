const Prism = require("prismjs");

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
        permalink: "/blog/:slug",
        isPost: true,
        anchorLevel: 4,
        generate: ["get", "getAll"]
      }
    ]
  ],
  api: function(isStatic) {
    return {
      baseURL: "http://localhost:3000",
      browserBaseURL: isStatic
        ? "https://nuxtent--nuxt-tailwind.netlify.com"
        : ""
    };
  },
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
  }
};
