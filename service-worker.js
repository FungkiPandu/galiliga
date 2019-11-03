const CACHE_NAME = "gali-liga-v1.0.0";
var urlsToCache = [
    "/",
    "/index.html",
    "/navigation.html",
    "/assets/css/main.css",
    "/assets/css/materialize.min.css",
    '/assets/js/materialize.min.js',
    '/assets/js/jquery-3.4.1.min.js',
    '/assets/js/nav.js',
    '/assets/js/main.js',
    '/assets/images/gbk.jpg',
    '/assets/images/bundesliga.jpg',
    "/assets/images/la_liga.jpg",
    "/assets/images/ligue_1.jpg",
    "/assets/images/premier_league.jpg",
    "/assets/images/serie_a.jpg",
    "/pages/bundesliga.html",
    "/pages/la_liga.html",
    "/pages/ligue_1.html",
    "/pages/premier_league.html",
    "/pages/serie_a.html",
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", function(event) {
    // noinspection JSCheckFunctionSignatures
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function(response) {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log(
                    "ServiceWorker: Memuat aset dari server: ",
                    event.request.url
                );
                return fetch(event.request);
            })
    );
});
