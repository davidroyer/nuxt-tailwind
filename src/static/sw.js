importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-tailwind",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.1113d73fd38df6ab76d8f29dcf5a5c15.css",
    "revision": "a5b49c7fa8984fce6c540880be045a5b"
  },
  {
    "url": "/_nuxt/app.ffcd1e620d24f3ce91b8.js",
    "revision": "893d3c47f3fa0303978a265f67f671be"
  },
  {
    "url": "/_nuxt/layouts/default.f2619d6155c66650fa2f.js",
    "revision": "b9b7916bc937ee719db6001e4a05da7c"
  },
  {
    "url": "/_nuxt/manifest.00b6341fb19bc54f8261.js",
    "revision": "8278023c17ab92eddac9784040a69201"
  },
  {
    "url": "/_nuxt/pages/_slug.805f9c9e9afc2ccf6eca.js",
    "revision": "e44f8dd9bebb50030100373d5cf30aed"
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
    "url": "/_nuxt/pages/examples.f162524bfbe8269b79bf.js",
    "revision": "fe21734fbe0585a9d9f51086b3d9a420"
  },
  {
    "url": "/_nuxt/pages/index.42f5f14290f35057fcc5.js",
    "revision": "1f91433977d747462f7b4a3dc0cde5cd"
  },
  {
    "url": "/_nuxt/pages/original-about.e76d4bc5abb05bbf8578.js",
    "revision": "76ad00729e0962bc7ad05054d1b40b47"
  },
  {
    "url": "/_nuxt/pages/post/_slug.87c1940c2fb7bea4ccf9.js",
    "revision": "e3765d7e0b7242fdf0e406cee5208655"
  },
  {
    "url": "/_nuxt/vendor.e86f7b362da770b39d82.js",
    "revision": "1694c2b6bff1608c4048e81231c519d6"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

