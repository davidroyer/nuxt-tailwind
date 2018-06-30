const tailwind = require("./tailwind");

module.exports = {
  pathPrefix: "/", // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "/portfolio"
  analyticsID: "UA-56060335-6",
  siteTitle: "Nuxt TailWind Starter - David Royer", // Navigation and Site Title
  shortName: "D.Royer", // Alternative Site title for SEO
  siteUrl: "https://nuxt-tailwind.netlify.com", // Domain of your site. No trailing slash!
  siteLanguage: "en", // Language Tag on <html> element
  siteLogo: "/logos/logo-1024.png", // Used for SEO and manifest
  siteDescription:
    "A boilerplate template for Nuxt.js projects using serveral Nuxt modules, global vue components, tailwindcss, and many other features.",
  siteFBAppID: "123456789", // Facebook App ID
  twitterUsername: "@DavidRoyer_", // Twitter Username
  ogTitle: "David Royer",
  ogType: "website",
  ogImage: "icon.png",
  ogSiteName: "cara", // Facebook Site Name
  ogLanguage: "de_DE", // Facebook Language

  // Manifest and Progress color
  themeColor: tailwind.colors["grey-darkest"],
  backgroundColor: tailwind.colors["grey-lightest"]
};
