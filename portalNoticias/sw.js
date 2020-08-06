/**
 * @class sw
 *
 * @summary Classe referente ao serviceWorker utilizado pela aplicação.
 */
var cacheName = "noticias-pwa";
var filesToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/Main.js",
  "/src/Controller.js",
  "/src/DAO.js",
  "/src/Noticia.js",
  "/src/View.js"
];

/* Start the service worker and cache all of the app's content */
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
