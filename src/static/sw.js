importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-tailwind",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.422faa80dc9eab58cdb5.js",
    "revision": "b8a45865905ca6fd47a3713f0ad112a8"
  },
  {
    "url": "/_nuxt/app.91de370ac0d9d11b9c4892e1f088729f.css",
    "revision": "1eaa397eb1172ca282d5a70b4e464eb3"
  },
  {
    "url": "/_nuxt/layouts/default.7e218e6e3af6556b9d08.js",
    "revision": "b9b7916bc937ee719db6001e4a05da7c"
  },
  {
    "url": "/_nuxt/manifest.0ee52a15c23722682bef.js",
    "revision": "9d242efefc16758e89bf537a78bfda55"
  },
  {
    "url": "/_nuxt/pages/about.7716f4a7669f51c3fdf7.js",
    "revision": "7d3066537256a50b27d8ef9796da05ea"
  },
  {
    "url": "/_nuxt/pages/blog.323ba46124a7bd14f3ab.js",
    "revision": "a08d2324eb72c754a89f9e9943d8884b"
  },
  {
    "url": "/_nuxt/pages/contact.90682bcf34f77a9b366e.js",
    "revision": "ccb4d6dd68f8f0cf19c187f1242b1080"
  },
  {
    "url": "/_nuxt/pages/examples.0cf513e12cd201fa3d3e.js",
    "revision": "849a74164299eca9cad92cb75c7f7b44"
  },
  {
    "url": "/_nuxt/pages/index.5a4e958ebd0e890a01cd.js",
    "revision": "c199fbeb482794a55fb18c427c8d2a62"
  },
  {
    "url": "/_nuxt/vendor.175e1c9039651bff9cc8.js",
    "revision": "e0464533ba42824754f534237275a715"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

