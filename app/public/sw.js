var staticCacheName = 'v1';

const numImages = 9;
let currImage = 0;

const images = []

for(let i = 0; i <= numImages; i++) {
  images[i] = `/images/${i}.jpg`;
}

var urlsToCache = [
  '/',
  '/stylesheets/style.css',
  '/javascripts/kitties.js'
].concat(images);

self.addEventListener('install', function(event) {
  console.log('Attempting to install service worker and cache static assets');

  event.waitUntil(
    caches.open(staticCacheName)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Finally active. Ready to start serving content!');
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('push', function(event) {
  console.log(event)
});
