const Prism = require("prismjs");
// require('prismjs/components/prism-javascript');
// // require('prismjs/components/prism-html');
// require('prismjs/components/prism-bash');

module.exports = {
  content: {
    page: "/blog/_post",
    permalink: "/blog/:slug",
    isPost: true,
    anchorLevel: 4,
    generate: ["get", "getAll"]
  },

  parsers: {
    md: {
      extend(config) {
        config.highlight = (code, lang) => {
          return `<pre class="language-${lang}"><code>${Prism.highlight(
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
