importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-tailwind",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.0e43d286c8f45e9af1a7.js",
    "revision": "c09c0352ee05e5d3263ede121be02464"
  },
  {
    "url": "/_nuxt/app.1113d73fd38df6ab76d8f29dcf5a5c15.css",
    "revision": "f6598d0d1549d8eed4b8590b5a96a163"
  },
  {
    "url": "/_nuxt/layouts/default.ceb8a2a72665ebebff0f.js",
    "revision": "6598dd58a114ed5d4db1ebe01b91bc4c"
  },
  {
    "url": "/_nuxt/manifest.b5cac02c7d5b3426bed7.js",
    "revision": "121113a1e84b94b8ea5bb5bbf9a0d8ee"
  },
  {
    "url": "/_nuxt/pages/_slug.066c9147beea2739f0c0.js",
    "revision": "349432c479dc37d0fbe833ebfab80f28"
  },
  {
    "url": "/_nuxt/pages/articles/_slug.1fc7f4a8df90ad1d64f8.js",
    "revision": "e397e2af3827d5aae4c69a462e044e71"
  },
  {
    "url": "/_nuxt/pages/articles/index.0b3669cdfd6787bee954.js",
    "revision": "bf7ef65e759058267b5c6f087ade8e72"
  },
  {
    "url": "/_nuxt/pages/blog.e079c0381c6bb37b5312.js",
    "revision": "a896f4f3ede7dd50938430e280a1fab0"
  },
  {
    "url": "/_nuxt/pages/contact.2ae04c19ed44350e78ae.js",
    "revision": "965162617bb73238df5a9ce057023b32"
  },
  {
    "url": "/_nuxt/pages/examples.7b1e56928fda47594413.js",
    "revision": "f1fcf7c8c7904e31311745dcad2ff410"
  },
  {
    "url": "/_nuxt/pages/index.e72d8ded0ee306e261e8.js",
    "revision": "a0bb4472aa7cb3928007b35d65f82238"
  },
  {
    "url": "/_nuxt/pages/original-about.e76d4bc5abb05bbf8578.js",
    "revision": "76ad00729e0962bc7ad05054d1b40b47"
  },
  {
    "url": "/_nuxt/vendor.63249874f038a6b29de9.js",
    "revision": "783c7d4dc3ad08ed8f2260c6ff0716f0"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

