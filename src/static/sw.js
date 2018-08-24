importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-tailwind",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.1113d73fd38df6ab76d8f29dcf5a5c15.css",
    "revision": "f6598d0d1549d8eed4b8590b5a96a163"
  },
  {
    "url": "/_nuxt/app.5a8290da422c07bc030b.js",
    "revision": "8dbdf2e0068deddef5f6ca8179c566cd"
  },
  {
    "url": "/_nuxt/layouts/default.551ce8c1f4eac301e180.js",
    "revision": "6bb2008df16f0bb2f693e1e75eb67dd2"
  },
  {
    "url": "/_nuxt/manifest.3f786e080a749dcc052f.js",
    "revision": "8cef26c9d5f6559a6f6a25f03f247a60"
  },
  {
    "url": "/_nuxt/pages/_slug.066c9147beea2739f0c0.js",
    "revision": "349432c479dc37d0fbe833ebfab80f28"
  },
  {
    "url": "/_nuxt/pages/articles/_slug.c5b70c316a2253b99a34.js",
    "revision": "ae3c8599b5d75705c0c3ccdaff5ad743"
  },
  {
    "url": "/_nuxt/pages/articles/index.2ee4a5418415f7898286.js",
    "revision": "94e4515a058ed4460a3dfb6dfec61d87"
  },
  {
    "url": "/_nuxt/pages/blog.58b4e19758f7cf234363.js",
    "revision": "8e8dae902dc618a1e01d0f0f5086c1ee"
  },
  {
    "url": "/_nuxt/pages/contact.2c6f6d612b4a6b276aca.js",
    "revision": "3cd671e2e32628167df862c01e3d1577"
  },
  {
    "url": "/_nuxt/pages/examples.f9aa68e28e02ec6f8f99.js",
    "revision": "1a819454f61c3056a898d518683540ec"
  },
  {
    "url": "/_nuxt/pages/index.e7b109d445d3972d068b.js",
    "revision": "8b9cc1bfafe46e608e759cc2c21f0231"
  },
  {
    "url": "/_nuxt/pages/original-about.352dfce5a79fc236b887.js",
    "revision": "e3996332e3a3eedb913f9cd33e1237aa"
  },
  {
    "url": "/_nuxt/vendor.111adf6fc7a3446db48f.js",
    "revision": "dbb3d6b2a4943277d9dc9609234dd658"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

