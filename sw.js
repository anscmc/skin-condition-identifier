const CACHE_NAME = 'skin-ai-v3.0';
const assets = [
  './', 
  './index.html', 
  './model.json', 
  './metadata.json', 
  './weights.bin'
];

// Install the service worker and cache all files locally
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching medical assets...');
      return cache.addAll(assets);
    })
  );
});

// Serve files from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
