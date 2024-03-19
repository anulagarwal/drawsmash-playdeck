const cacheName = "Momo Games-Draw To Smash!-0.1";
const contentToCache = [
    "Build/6d1cd1d46be3a0da08a323b0311e5fa7.loader.js",
    "Build/7fd65033dd01e7f3dd3bbba1b1626551.framework.js",
    "Build/d058b93c46a4cdcdd7259552ada77877.data",
    "Build/9cb98cb32a1dac1b5c5312cbfd099ec3.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
