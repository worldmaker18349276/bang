const CACHE = "v1";

const ASSETS = [
  "./",
  "./index.html",
  "./main.js",
  "./bangs.json",
];

// Install: cache all static assets
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});

// Fetch: serve from cache first, fallback to network
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
