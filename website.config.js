const tailwind = require("./tailwind");

module.exports = {
  pathPrefix: "/", // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "/portfolio"
  analyticsID: "UA-56060335-6",
  siteTitle: "Nuxt Tailwind Starter - David Royer Website", // Navigation and Site Title
  siteTitleAlt: "Cara", // Alternative Site title for SEO
  siteUrl: "https://nuxt-tailwind.netlify.com", // Domain of your site. No trailing slash!
  siteLanguage: "en", // Language Tag on <html> element
  siteLogo: "/logos/logo-1024.png", // Used for SEO and manifest
  siteDescription:
    "A boilerplate template for Nuxt.js projects using serveral Nuxt modules, global vue components, tailwindcss, and many other features.",
  siteFBAppID: "123456789", // Facebook App ID
  userTwitter: "@DavidRoyer_", // Twitter Username
  ogSiteName: "cara", // Facebook Site Name
  ogLanguage: "de_DE", // Facebook Language

  // Manifest and Progress color
  themeColor: tailwind.colors.orange,
  backgroundColor: tailwind.colors.blue
};
