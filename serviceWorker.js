const staticCacheName = "cache-v1";
const assets = ["/", "/index.html"];

// datei in cache hinzufügen
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // wictig: request clonen.
      // request kopieren und nutzen
      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(function (response) {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        var responseToCache = response.clone();

        caches.open(staticCacheName).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

// cache löschen
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.add(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});
