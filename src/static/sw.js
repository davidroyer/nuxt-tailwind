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
    "url": "/_nuxt/app.9d8dc512d626a3490eb2.js",
    "revision": "3e29eeeb775fdfcbc49560eae133d40b"
  },
  {
    "url": "/_nuxt/layouts/default.f2619d6155c66650fa2f.js",
    "revision": "b9b7916bc937ee719db6001e4a05da7c"
  },
  {
    "url": "/_nuxt/manifest.ac686d85c24825348b73.js",
    "revision": "45c35424121cc3656180940ae136268a"
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
    "url": "/_nuxt/pages/contact.dcbb72c2ad4f91e223e2.js",
    "revision": "ccb4d6dd68f8f0cf19c187f1242b1080"
  },
  {
    "url": "/_nuxt/pages/examples.47a100d5c1e2a299419d.js",
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

