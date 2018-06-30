importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-tailwind",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.91de370ac0d9d11b9c4892e1f088729f.css",
    "revision": "bdbb9d8fb04afd60d1a0d16fdf30312e"
  },
  {
    "url": "/_nuxt/app.f9f9214a9f05c986189a.js",
    "revision": "4b2caf11df86c8b70e2462599548d3f8"
  },
  {
    "url": "/_nuxt/layouts/default.f2619d6155c66650fa2f.js",
    "revision": "b9b7916bc937ee719db6001e4a05da7c"
  },
  {
    "url": "/_nuxt/manifest.ba040cd2886f79ba8ca4.js",
    "revision": "cb773aa302eeeeaf080bfc8bbd00f2e0"
  },
  {
    "url": "/_nuxt/pages/about.c841cad22c158faeb270.js",
    "revision": "900802efe9a9b24277c31df52fff313e"
  },
  {
    "url": "/_nuxt/pages/blog.21f4a5fdc1b6e8a6ba17.js",
    "revision": "2e7b07c413a6b0ed40b875b64f79841b"
  },
  {
    "url": "/_nuxt/pages/contact.3814345cfc63a21bcb43.js",
    "revision": "5ec94a6fcf6a3f9abc59386cd5e78f1e"
  },
  {
    "url": "/_nuxt/pages/examples.dfa56b6000a59feff7a1.js",
    "revision": "c54b3c1cee78d4191c51a1093330053c"
  },
  {
    "url": "/_nuxt/pages/index.850492c951e8d4d1f952.js",
    "revision": "95c54f5d2e2dc633a670401df31faeca"
  },
  {
    "url": "/_nuxt/vendor.175e1c9039651bff9cc8.js",
    "revision": "e0464533ba42824754f534237275a715"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

