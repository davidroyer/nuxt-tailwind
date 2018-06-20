importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-tailwind",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.50b78da0c3bb643e786d.js",
    "revision": "7f1b440e82b1bf461d22e94faf935bd3"
  },
  {
    "url": "/_nuxt/app.5359e722cbdd895b37b1c313cee825fc.css",
    "revision": "e0363fcfd78a0e3da048dabfc5dc8646"
  },
  {
    "url": "/_nuxt/layouts/default.5ad4ba7ce7aec21a0299.js",
    "revision": "90d0536dcaa285e4811360f011dd901c"
  },
  {
    "url": "/_nuxt/manifest.793c295d75635b10ba67.js",
    "revision": "117ba542f6877d77316723a103551693"
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
    "url": "/_nuxt/pages/contact.e5315491a6834517fc4f.js",
    "revision": "75d0a39d95b644d5986a6d5ff9c68b42"
  },
  {
    "url": "/_nuxt/pages/examples.f27485184509d8bc9d73.js",
    "revision": "7904b9bbefff4c9af92ac00dbef33b8d"
  },
  {
    "url": "/_nuxt/pages/index.5e85d2d64267ae5b9959.js",
    "revision": "999b53408508b80d81a4906883f86432"
  },
  {
    "url": "/_nuxt/vendor.5c203c3483e0a9100152.js",
    "revision": "607eab556167e6c9da56df276bec9436"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

