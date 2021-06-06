self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('reminders-v1').then(function(cache) {
        return cache.addAll([
            "/",
            '/common.js',
        ]);
      }).catch((e) => {
        console.log("something went wrong with caching", e);
      })
    );
   });
   
   self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open('reminders-v1').then(function(cache) {
          return cache.match(event.request).then(function (response) {
            return response || fetch(event.request).then(function(response) {
                if(response.ok && event.request && (event.request.url.includes("localhost") || event.request.url.includes("reminder"))) {
                    cache.put(event.request, response.clone());
                }
              return response;
            });
          });
        })
      );
   });
  
  
   
   