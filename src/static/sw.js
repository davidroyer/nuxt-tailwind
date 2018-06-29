importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-tailwind",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.91de370ac0d9d11b9c4892e1f088729f.css",
    "revision": "1eaa397eb1172ca282d5a70b4e464eb3"
  },
  {
    "url": "/_nuxt/app.f9686e6425207f41702f.js",
    "revision": "65e9877169abaea75689e447c3f54c20"
  },
  {
    "url": "/_nuxt/layouts/default.7e218e6e3af6556b9d08.js",
    "revision": "b9b7916bc937ee719db6001e4a05da7c"
  },
  {
    "url": "/_nuxt/manifest.a39ad9b324c79c13d49d.js",
    "revision": "9aa527e74b9d5e5065be9b0b446c2522"
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
    "url": "/_nuxt/pages/examples.0a67b9461ce4106e9702.js",
    "revision": "f021b28fbb1a921bf22853771c1a7aa5"
  },
  {
    "url": "/_nuxt/pages/index.5a4e958ebd0e890a01cd.js",
    "revision": "c199fbeb482794a55fb18c427c8d2a62"
  },
  {
    "url": "/_nuxt/vendor.b5e3d32cb70b1f6e0f09.js",
    "revision": "e681219800b5324181aa056c3ba83c15"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

