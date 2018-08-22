importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-tailwind",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.0e1237be2cbcbd788a61.js",
    "revision": "315bb2d7390a712004b76e99643824fb"
  },
  {
    "url": "/_nuxt/app.1113d73fd38df6ab76d8f29dcf5a5c15.css",
    "revision": "a5b49c7fa8984fce6c540880be045a5b"
  },
  {
    "url": "/_nuxt/layouts/default.f2619d6155c66650fa2f.js",
    "revision": "b9b7916bc937ee719db6001e4a05da7c"
  },
  {
    "url": "/_nuxt/manifest.2db822a06bbdb7c47f6e.js",
    "revision": "7d4ef4ea2aec0422488fc1072b3f0954"
  },
  {
    "url": "/_nuxt/pages/_slug.28e7a645405373c12a10.js",
    "revision": "19d3ade1d47ad5aea89e37ecf6f56783"
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
    "url": "/_nuxt/pages/examples.f162524bfbe8269b79bf.js",
    "revision": "fe21734fbe0585a9d9f51086b3d9a420"
  },
  {
    "url": "/_nuxt/pages/index.59d2038b1ead95782235.js",
    "revision": "1960f2795f5f028e8ba54058cd99f643"
  },
  {
    "url": "/_nuxt/pages/original-about.352dfce5a79fc236b887.js",
    "revision": "e3996332e3a3eedb913f9cd33e1237aa"
  },
  {
    "url": "/_nuxt/vendor.4c471ff7d63ce384cbec.js",
    "revision": "181418b1a7a319fd5229a23306fc1bff"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

