const cacheName = "Momo Games-Draw And Smash!-0.2";
const contentToCache = [
    "Build/D2STelegram.loader.js",
    "Build/899bd5daf6ab10cb61a95c13be5676ca.js",
    "Build/4e3906e3ab0cb529940f32a034186bb4.data",
    "Build/604ff27de67f4fda15ed914f25744731.wasm",
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
