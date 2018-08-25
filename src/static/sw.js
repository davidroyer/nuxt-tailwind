importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-tailwind",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.1113d73fd38df6ab76d8f29dcf5a5c15.css",
    "revision": "18f673e57518086e0381aaf89dda0658"
  },
  {
    "url": "/_nuxt/app.b69f8bc31b3b78739a50.js",
    "revision": "1ebca4fdc9ef09c294865409258a0862"
  },
  {
    "url": "/_nuxt/layouts/default.154ce312010ee8dfab2f.js",
    "revision": "de5088d66aa1b30141ffef48b8992a63"
  },
  {
    "url": "/_nuxt/manifest.0723345b7e09476ae3f9.js",
    "revision": "ef3e1efb269ad8375c239a8f522a39a2"
  },
  {
    "url": "/_nuxt/pages/_slug.208acb19092760af483e.js",
    "revision": "abdfdcd21383bbcc43af61975da5c966"
  },
  {
    "url": "/_nuxt/pages/articles/_slug.511c665746fe1664b7dc.js",
    "revision": "fc8d5eeb021d64a284ea96aef4661e83"
  },
  {
    "url": "/_nuxt/pages/articles/index.62e30af6ecf2ca7ee4f5.js",
    "revision": "8c3ab5d360ab1b6f25cce7e0f66696ac"
  },
  {
    "url": "/_nuxt/pages/blog.184b3d5711f2b36c51b6.js",
    "revision": "7c8cfb8d6c163259d96a5cd6cbfa0964"
  },
  {
    "url": "/_nuxt/pages/index.a9095477eff7899cfc28.js",
    "revision": "fec82fe0002926222a9fb0f44c7b5c14"
  },
  {
    "url": "/_nuxt/pages/original-about.97be5fae120e6e973fcb.js",
    "revision": "cac00e489d16b606845a6c121856b196"
  },
  {
    "url": "/_nuxt/vendor.53ad98f8fc78e5452e6c.js",
    "revision": "15f13a304639dd7a4de9203528e44592"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

