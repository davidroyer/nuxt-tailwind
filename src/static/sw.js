importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-tailwind",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.0224780bd9ee842a85b9.js",
    "revision": "ca6afa5de5523d4df0f3da34990c3c3c"
  },
  {
    "url": "/_nuxt/app.1a86dd26521d18a71916f46cd133f326.css",
    "revision": "1491a8681e37dbe97aaaf1adc4c4e2e8"
  },
  {
    "url": "/_nuxt/layouts/default.b2ef8392d9e6a1c25d2d.js",
    "revision": "5549e366a526894063ae563c6ff80f65"
  },
  {
    "url": "/_nuxt/manifest.0c7591bcc2841c99970f.js",
    "revision": "9dd238e8297da992916903fabdca013c"
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
    "url": "/_nuxt/pages/contact.e6b80925088e9f466373.js",
    "revision": "6d9a7230aa25e4e1bae0d3448c40ca26"
  },
  {
    "url": "/_nuxt/pages/examples.394e8f93f32942d5d8b1.js",
    "revision": "da9f6a50c6f50729daf7b13e9d81197f"
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

