self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('reminders').then(function(cache) {
        return cache.addAll([
          '/static/css/*',
          '/common.js',
          '/static/js/*',
          '/favicon.ico',
          '/manifest.json',
          '/static/media/*'
        ]);
      })
    );
   });
   
   self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
   
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
   });
  
  
   
   