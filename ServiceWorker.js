const cacheName = "Momo Games-Draw To Smash!-1.0";
const contentToCache = [
    "Build/DrawSmash_Telegram.loader.js",
    "Build/0afc706fc464b5889bdf2bb494d5706a.js",
    "Build/f7872a1b60e22d7fcb34816aa81f15dd.data",
    "Build/100c9d37b46447956f3e09a58f7e4b2b.wasm",
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
