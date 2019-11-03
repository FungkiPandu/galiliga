const CACHE_NAME = "gali-liga";
var urlsToCache = [
    "/",
    "/index.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});
