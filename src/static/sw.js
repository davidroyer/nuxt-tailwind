importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-tailwind",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.b5f2aa1a033fe9e2de77ac3f92fcbe8c.css",
    "revision": "5c0fdf5c9e68866e3591a7d4d2fe7439"
  },
  {
    "url": "/_nuxt/app.bda788e17f6823d8a853.js",
    "revision": "5758ff37aaa1afa4531273be01cddcf8"
  },
  {
    "url": "/_nuxt/layouts/default.dfd2c5da4fa1ee26fe8d.js",
    "revision": "5fc30b61f8710a8790074c96c64b600c"
  },
  {
    "url": "/_nuxt/manifest.c1b3c17e9245890c3dc9.js",
    "revision": "bcac56afcc2a96f1b09547ca3a628746"
  },
  {
    "url": "/_nuxt/pages/about.60de316222e6e3a87015.js",
    "revision": "6d6708275db9dcd3c3f54570634efacb"
  },
  {
    "url": "/_nuxt/pages/blog.b0fa48220611c87f1746.js",
    "revision": "c0a8692d48616c4b921eabc8582467ce"
  },
  {
    "url": "/_nuxt/pages/contact.033fec069805c6d90807.js",
    "revision": "3f5ffc4d2bd7bcbd4d89c411c39232ad"
  },
  {
    "url": "/_nuxt/pages/examples.f27485184509d8bc9d73.js",
    "revision": "7904b9bbefff4c9af92ac00dbef33b8d"
  },
  {
    "url": "/_nuxt/pages/index.6e8cb65ffedc73d16d1d.js",
    "revision": "15d0bcd69ff7ccbae9a0cc7546ddd5dd"
  },
  {
    "url": "/_nuxt/vendor.3f03ad0b86f3ac2bcf62.js",
    "revision": "af01a5f6676c23857d1c23c521bdd6ca"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

