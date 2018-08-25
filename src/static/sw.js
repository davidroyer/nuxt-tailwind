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
    "url": "/_nuxt/app.e759eb4aa13500854df1.js",
    "revision": "cfd81728b67dedc15ee97b540639a97d"
  },
  {
    "url": "/_nuxt/layouts/default.154ce312010ee8dfab2f.js",
    "revision": "de5088d66aa1b30141ffef48b8992a63"
  },
  {
    "url": "/_nuxt/manifest.2870c3f01a99156566dc.js",
    "revision": "19846d24bf124562f96e05ffa8173c15"
  },
  {
    "url": "/_nuxt/pages/_slug.8bcc0865c417461f7941.js",
    "revision": "3dae61431b03a6938a22403b3c607ddf"
  },
  {
    "url": "/_nuxt/pages/articles/_slug.a4cfd933baba6aaf4185.js",
    "revision": "26ba31487b523700af0302b6fbf669b0"
  },
  {
    "url": "/_nuxt/pages/articles/index.cd2313da16854ad48661.js",
    "revision": "8c035336b63672217f297097fc4bdd1d"
  },
  {
    "url": "/_nuxt/pages/blog.184b3d5711f2b36c51b6.js",
    "revision": "7c8cfb8d6c163259d96a5cd6cbfa0964"
  },
  {
    "url": "/_nuxt/pages/index.14b6f81736a77b55c8eb.js",
    "revision": "8251cf2842bdc5bb47142cda84921646"
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

